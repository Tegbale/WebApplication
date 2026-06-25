import { defineStore } from 'pinia'
import eventsApi from '@/api/events'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    meta: { total: 0, page: 1, limit: 20, totalPages: 0 },
    loading: false,
  }),

  actions: {
    async fetchAll(params) {
      this.loading = true
      try {
        const { data } = await eventsApi.getEvents(params)
        this.events = data.data
        this.meta = data.meta
      } finally {
        this.loading = false
      }
    },

    async create(payload) {
      const { data } = await eventsApi.createEvent(payload)
      this.events.unshift(data.data)
      this.meta.total++
      return data.data
    },

    async update(id, payload) {
      const { data } = await eventsApi.updateEvent(id, payload)
      const idx = this.events.findIndex((e) => e.id === id)
      if (idx !== -1) this.events[idx] = { ...this.events[idx], ...data.data }
      return data.data
    },

    async remove(id) {
      await eventsApi.deleteEvent(id)
      this.events = this.events.filter((e) => e.id !== id)
      this.meta.total--
    },
  },
})
