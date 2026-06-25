// Staff store (school-scoped)
import { defineStore } from 'pinia'
import staffApi from '@/api/admin'

export const useAdminsStore = defineStore('admin', {
  state: () => ({
    staff: [],
    meta: { total: 0, page: 1, limit: 20, totalPages: 0 },
    loading: false,
  }),

  getters: {
    allUsers: (state) => state.staff,
  },

  actions: {
    async fetchAllStaff(params) {
      this.loading = true
      try {
        const { data } = await staffApi.getAllStaff(params)
        this.staff = data.data
        this.meta = data.meta
      } finally {
        this.loading = false
      }
    },

    async createStaff(payload) {
      const { data } = await staffApi.createStaff(payload)
      const result = data.data
      this.staff.unshift(result.user ?? result)
      this.meta.total++
      return result
    },

    async updateStaff(id, payload) {
      const { data } = await staffApi.updateStaff(id, payload)
      const idx = this.staff.findIndex((s) => s.id === id)
      if (idx !== -1) this.staff[idx] = { ...this.staff[idx], ...data.data }
      return data.data
    },

    async toggleStatus(id) {
      const { data } = await staffApi.toggleStaffStatus(id)
      const idx = this.staff.findIndex((s) => s.id === id)
      if (idx !== -1) this.staff[idx].isActive = data.data.isActive
      return data.data
    },
  },
})
