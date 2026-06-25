import axios from 'axios'
import { useUsersStore } from '@/stores/user-store'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// By the time any interceptor fires, all modules in the circular chain
// (axios→store→api→axios) are fully initialized — safe to call useUsersStore() here.
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
