import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type TUser = {
  id: string
  name: string
  email: string
}

export type TAuthStore = {
  isAuthenticated: boolean
  token: string | null
  user: TUser | null
  login: (token: string) => void
  logout: () => void
}

const useAuthStore = create(
  persist<TAuthStore>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (token) => set({ isAuthenticated: true, token: token }),
      logout: () => set({ isAuthenticated: false, user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export default useAuthStore
