import { client } from '@/lib/axios'
import { create } from 'zustand'
import useAuthStore from './authStore'

export type TTrip = {
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
}

export type TTripParticipant = {
  id: number
  tripId: number
  userId: number
  status: 'confirmed' | 'pending' | 'declined'
}

export type TTripStore = {
  trips: TTrip[]
  tripParticipants: TTripParticipant[]
  fetchTrips: () => void
  fetchTripParticipants: (tripId: number) => void
}

export const useTripStore = create<TTripStore>((set) => ({
  trips: [],
  tripParticipants: [],
  fetchTrips: async () => {
    try {
      const response = await client.get('/trip', {
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
  fetchTripParticipants: async (tripId: number) => {
    try {
      const response = await client.get(`/trip/${tripId}/participants`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      })
      const data = await response.data.data
      set({ tripParticipants: data })
    } catch (err: any) {
      console.error(err)
    }
  },
}))
