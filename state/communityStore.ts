import { create } from 'zustand'
import useAuthStore from './authStore'
import { client } from '@/lib/axios'
import type { TAxiosResponse } from '@/lib/types'
import type { TTripOverview } from './tripStore'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useToastController } from '@tamagui/toast'

export type TCommunityMember = {
  id: number
  userId: string
  communityId: number
  role: 'admin' | 'member'
}

export type TCommunityAnnouncement = {
  id: number
  title: string
  content: string
  communityId: number
  communtyId: number
  tripId: number
}

export type TCommunityMessage = {
  id: number
  content: string
  communityId: number
  senderId: number
  sentAt: string
}

export type TCommunityOverview = {
  id: number
  name: string
  description: string
  createdBy: string
  isPrivate: boolean
  coverImage: string
  profilePicture: string
  members: TCommunityMember[]
  memberCount: number
  isMember: boolean
}

export type TCommunityStore = {
  communities: TCommunityOverview[]
  fetchCommunities: () => void
}

export type TCommunityDetail = {
  id: number
  name: string
  description: string
  createdBy: string
  isPrivate: boolean
  coverImage: string
  profilePicture: string
  trips: TTripOverview[]
  members: (TCommunityMember & {
    profile: {
      fullName: string
      profilePicture: string
    }
  })[]
  memberCount: number
  isAdmin: boolean
  isMember: boolean
}

export const useCommunityStore = create<TCommunityStore>((set) => ({
  communities: [],
  fetchCommunities: async () => {
    try {
      const response = await client.get<TAxiosResponse<TCommunityOverview[]>>(
        '/community/overview',
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
          },
        },
      )

      if (response.data.error) {
        throw new Error(response.data.error.message)
      }

      const data = response.data.data
      set({ communities: data })
    } catch (e) {
      console.error(e)
    }
  },
}))

export const useCommunityHomeHook = (page = 0, limit = 5) => {
  const toast = useToastController()
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['communities'],
    queryFn: async () => {
      const response = await client.get<TAxiosResponse<TCommunityOverview[]>>(
        '/community/overview',
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
      useCommunityStore.setState({ communities: data ?? [] })
    }
  }, [data])

  return { data: data ?? [], isLoading, error, refetch }
}

export const useCommunityPageHook = (limit = 5) => {
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
    queryKey: ['communities_page'],
    queryFn: async ({ pageParam }) => {
      const response = await client.get<TAxiosResponse<TCommunityOverview[]>>(
        '/community/overview',
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
