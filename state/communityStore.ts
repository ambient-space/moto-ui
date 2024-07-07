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

export type TCommunity = {
  id: number
  name: string
  description: string
  createdBy: string
  isPrivate: boolean
  coverImage: string
  profilePicture: string
}

export type TCommunityStore = {
  communities: TCommunity[]
  communityMembers: TCommunityMember[]
  communityAnnouncements: TCommunityAnnouncement[]
  communityMessages: TCommunityMessage[]
  fetchCommunities: () => void
  fetchCommunityMembers: (communityId: number) => void
  fetchCommunityAnnouncements: (communityId: number) => void
  fetchCommunityMessages: (communityId: number) => void
}

export const useCommunityStore = create<TCommunityStore>((set) => ({
  communities: [],
  communityMembers: [],
  communityAnnouncements: [],
  communityMessages: [],
  fetchCommunities: async () => {
    try {
      const response = await client.get('/community', {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      })
      const data = await response.data.data
      set({ communities: data })
    } catch (e) {
      console.error(e)
    }
  },
  fetchCommunityMembers: async (communityId: number) => {
    const response = await client.get(`/community/${communityId}/members`, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    })
    const data = await response.data.data
    set({ communityMembers: data })
  },
  fetchCommunityAnnouncements: async (communityId: number) => {
    const response = await client.get(`/community/${communityId}/announcements`)
    const data = await response.data.data
    set({ communityAnnouncements: data })
  },
  fetchCommunityMessages: async (communityId: number) => {
    const response = await client.get(`/community/${communityId}/messages`)
    const data = await response.data.data
    set({ communityMessages: data })
  },
}))
