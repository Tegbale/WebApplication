import { useUsersStore } from '@/stores/user-store'

export default function auth({ next, router }) {
  const store = useUsersStore()

  if (!store.isAuthenticated) {
    return router.push({ name: 'login' })
  }

  return next()
}
