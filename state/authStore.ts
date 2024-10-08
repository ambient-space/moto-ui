import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/axios'
import type { TCommunityOverview } from './communityStore'
import type { TAxiosResponse } from '@/lib/types'
import type { TTripOverview } from './tripStore'
import { useToastController } from '@tamagui/toast'

export type TVehicleType =
  | 'Scooter'
  | 'Cruiser'
  | 'Sports Bike'
  | 'Tourer'
  | 'Scrambler'
  | 'Adventure'
  | 'Street Bike'
  | 'Moped'
  | 'Super bike'
  | 'Cafe Racer'
  | 'Commuter'
  | 'Maxi Scooter'
  | 'NA'

export type TUser = {
  id: string
  email: string
  username: string
  profile: {
    fullName: string
    profilePicture: string
  }
}

export type TUserProfileWithUsername = {
  fullName: string
  bio: string
  profilePicture: string
  coverImage: string
  authUser: {
    username: string
  }
  userVehicles: {
    id: number
    year: number
    vehicle: {
      id: number
      make: string
      model: string
      vehicleType: TVehicleType
    }
  }[]
}

export type TAuthStore = {
  isAuthenticated: boolean
  token: string | null
  user: TUser | null
  login: (token: string, userData: TUser) => void
  logout: () => void
}

const useAuthStore = create(
  persist<TAuthStore>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (token, userData) =>
        set({ isAuthenticated: true, token: token, user: userData }),
      logout: () => set({ isAuthenticated: false, user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export const useGetMyTrips = () => {
  const toast = useToastController()
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ['my-trips'],
    queryFn: async () => {
      const token = useAuthStore.getState().token
      const response = await client.get<TAxiosResponse<TTripOverview[]>>('/user/trips', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data || []
    },
  })

  if (error) {
    toast.show(error.message, {
      duration: 5000,
    })
  }
  return { data, refetch, isLoading, error }
}

export const useGetMyCommunities = () => {
  const toast = useToastController()
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ['my-communities'],
    queryFn: async () => {
      const token = useAuthStore.getState().token
      const response = await client.get<TAxiosResponse<TCommunityOverview[]>>(
        '/user/communities',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data.data || []
    },
  })

  if (error) {
    toast.show(error.message, {
      duration: 5000,
    })
  }

  return { data, refetch, isLoading, error }
}

export default useAuthStore
