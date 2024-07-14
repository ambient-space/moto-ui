import { client } from '@/lib/axios'
import { create } from 'zustand'
import useAuthStore from './authStore'

export type TTripOverview = {
  id: number
  communityId: number
  createdBy: string
  name: string
  description: string
  startDate: string
  endDate: string
  startLocation: { lat: number; lng: number }
  endLocation: { lat: number; lng: number }
  route: { lat: number; lng: number }[]
  maxParticipants: number
  participants: TTripParticipant[]
  participantCount: number
}

export type TTripParticipant = {
  id: number
  tripId: number
  userId: number
  status: 'confirmed' | 'pending' | 'declined'
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
