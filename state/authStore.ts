import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type TUser = {
  id: string
  email: string
  username: string
  profile: {
    fullName: string
    bio: string
    profilePicture: string
    coverImage: string
  }
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

export default useAuthStore
