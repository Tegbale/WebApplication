import { defineStore } from 'pinia'
import parentsApi from '@/api/parents'

export const useParentsStore = defineStore('parents', {
  state: () => ({
    parents: [],
    meta: { total: 0, page: 1, limit: 50, totalPages: 0 },
    loading: false,
  }),

  actions: {
    async fetchAll(params) {
      this.loading = true
      try {
        const { data } = await parentsApi.getParents(params)
        this.parents = data.data
        this.meta = data.meta
      } finally {
        this.loading = false
      }
    },

    async createParent(payload) {
      const { data } = await parentsApi.createParent(payload)
      this.parents.unshift(data.data.parent ?? data.data)
      this.meta.total++
      return data.data
    },

    async updateParent(id, payload) {
      const { data } = await parentsApi.updateParent(id, payload)
      const idx = this.parents.findIndex((p) => p.id === id)
      if (idx !== -1) this.parents[idx] = { ...this.parents[idx], user: { ...this.parents[idx].user, ...data.data } }
      return data.data
    },

    async toggleStatus(id) {
      const { data } = await parentsApi.toggleParentStatus(id)
      const idx = this.parents.findIndex((p) => p.id === id)
      if (idx !== -1) this.parents[idx].user.isActive = data.data.isActive
      return data.data
    },

    async remove(id) {
      await parentsApi.deleteParent(id)
      this.parents = this.parents.filter((p) => p.id !== id)
      this.meta.total--
    },

    async assignWard(parentId, studentId) {
      const { data } = await parentsApi.assignWard(parentId, studentId)
      const idx = this.parents.findIndex((p) => p.id === parentId)
      if (idx !== -1 && data.data) this.parents[idx] = data.data
      return data.data
    },

    async removeWard(parentId, studentId) {
      const { data } = await parentsApi.removeWard(parentId, studentId)
      const idx = this.parents.findIndex((p) => p.id === parentId)
      if (idx !== -1 && data.data) this.parents[idx] = data.data
      return data.data
    },
  },
})
