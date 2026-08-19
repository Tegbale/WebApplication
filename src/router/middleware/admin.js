import { useUsersStore } from '@/stores/user-store'

export default function admin({ next, router }) {
  const store = useUsersStore()

  if (!['SCHOOL_ADMIN', 'STAFF', 'TEACHER'].includes(store.role)) {
    return router.push({ name: 'login' })
  }

  return next()
}
