import axios from 'axios'
import { useUsersStore } from '@/stores/user-store'

const BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001').replace(/\/+$/, '')

const client = axios.create({
  baseURL: `${BASE}/api/v1`,
})

client.interceptors.request.use((config) => {
  const store = useUsersStore()
  if (store.accessToken) {
    config.headers.Authorization = `Bearer ${store.accessToken}`
  }
  return config
})

client.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.message ?? 'Something went wrong'
    if (error.response?.status === 401) {
      const store = useUsersStore()
      store.clearUserDetails()
      window.location.href = '/login'
    }
    return Promise.reject(message)
  }
)

export default () => client
