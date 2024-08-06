import { client } from '@/lib/axios'
import { create } from 'zustand'
import useAuthStore from './authStore'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import type { TAxiosResponse } from '@/lib/types'
import { useToastController } from '@tamagui/toast'

export type TTripOverview = {
  id: number
  name: string
  description: string
  startDate: string
  // startLocation: { lat: number; lng: number }
  // endLocation: { lat: number; lng: number }
  startLocation: string
  participants: TTripParticipant[]
  participantCount: number
  isParticipant: boolean
}

export type TTripDetails = {
  id: number
  communityId: number
  createdBy: string
  name: string
  description: string
  startDate: string
  endDate: string
  // startLocation: { lat: number; lng: number }
  // endLocation: { lat: number; lng: number }
  startLocation: string
  endLocation: string
  route: { lat: number; lng: number }[]
  maxParticipants: number

  community: {
    name: string
    description: string
    id: number
  } | null
  participantCount: number
} & (
  | {
      isParticipant: true
      participants: (TTripParticipant & {
        profile: {
          fullName: string
          profilePicture: string
        }
      })[]
    }
  | {
      isParticipant: false
      participants?: undefined
    }
) &
  (
    | {
        isAdmin: true
        joinRequests: TTJoinRequest[]
      }
    | {
        isAdmin: false
        joinRequests?: undefined
      }
  )

export type TTripParticipant = {
  id: number
  tripId: number
  userId: string
  status: 'confirmed' | 'pending' | 'declined'
  role: 'organizer' | 'participant'
}

export type TTJoinRequest = {
  id: number
  tripId: number
  userId: string
  status: 'rejected' | 'pending' | 'approved'
  profile: {
    fullName: string
    profilePicture: string
  }
}
export type TTripStore = {
  trips: TTripOverview[]
  fetchTrips: () => void
}

export const useTripStore = create<TTripStore>((set) => ({
  trips: [],
  tripParticipants: [],
  fetchTrips: async () => {
    try {
      const response = await client.get('/trip/overview', {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      })
      const data = await response.data.data
      set({ trips: data })
    } catch (err: any) {
      console.error(err)
    }
  },
}))

export const useTripHomeHook = (page = 0, limit = 5) => {
  const toast = useToastController()
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const response = await client.get<TAxiosResponse<TTripOverview[]>>(
        '/trip/overview',
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
          },
          params: {
            page,
            limit,
          },
        },
      )
      return response.data.data
    },
  })

  if (error) {
    toast.show(error.message, {
      duration: 5000,
    })
  }

  useEffect(() => {
    if (!isLoading && !error) {
      useTripStore.setState({ trips: data ?? [] })
    }
  }, [data])

  return { data: data ?? [], isLoading, error, refetch }
}

export const useTripPageHook = (limit = 5) => {
  const toast = useToastController()
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['trips_page'],
    queryFn: async ({ pageParam }) => {
      const response = await client.get<TAxiosResponse<TTripOverview[]>>(
        '/trip/overview',
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
          },
          params: {
            page: pageParam,
            limit,
          },
        },
      )
      return {
        data: response.data.data || [],
        pageParams: pageParam,
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data?.length < limit ? undefined : lastPage.pageParams + 1
    },
  })

  if (error) {
    toast.show(error.message, {
      duration: 5000,
    })
  }

  const flattenedData = data?.pages.flatMap((page) => page.data) ?? []

  return {
    data: flattenedData,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
