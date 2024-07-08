import { create } from 'zustand'
import useAuthStore from './authStore'
import { client } from '@/lib/axios'

export type TCommunityMember = {
  id: number
  userId: number
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
}

export type TCommunityStore = {
  communities: TCommunityOverview[]
  fetchCommunities: () => void
}

export const useCommunityStore = create<TCommunityStore>((set) => ({
  communities: [],
  fetchCommunities: async () => {
    try {
      const response = await client.get('/community/overview', {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      })
      const data = await response.data.data
      console.debug('Communities:', data[1].members)
      set({ communities: data })
    } catch (e) {
      console.error(e)
    }
  },
}))
