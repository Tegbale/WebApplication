import { defineStore } from 'pinia'
import { ref } from 'vue'
import notificationsApi from '@/api/notifications'

export const useNotificationsStore = defineStore('notifications', () => {
  const unreadCount = ref(0)

  const fetchUnreadCount = async () => {
    try {
      const res = await notificationsApi.getUnreadCount()
      unreadCount.value = res.data.data?.count ?? 0
    } catch {
      // silent
    }
  }

  const setUnreadCount = (n) => { unreadCount.value = n }

  return { unreadCount, fetchUnreadCount, setUnreadCount }
})
