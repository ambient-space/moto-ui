import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})
