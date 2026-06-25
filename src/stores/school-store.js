import { defineStore } from 'pinia'
import schoolApi from '@/api/school'

export const useSchoolStore = defineStore('school', {
  state: () => ({
    id: null,
    name: null,
    email: null,
    phone: null,
    address: null,
    logo: null,
    isActive: null,
    createdAt: null,
    _count: null,
  }),

  getters: {
    getSchoolDetails: (state) => ({
      id: state.id,
      name: state.name,
      email: state.email,
      phone: state.phone,
      address: state.address,
    }),
  },

  actions: {
    async fetchSchool(id) {
      const { data } = await schoolApi.getSchool(id)
      this._setSchool(data.data)
      return data.data
    },

    async updateSchool(id, payload) {
      const { data } = await schoolApi.updateSchool(id, payload)
      this._setSchool(data.data)
      return data.data
    },

    _setSchool(s) {
      this.id = s.id
      this.name = s.name
      this.email = s.email
      this.phone = s.phone ?? null
      this.address = s.address ?? null
      this.logo = s.logo ?? null
      this.isActive = s.isActive
      this.createdAt = s.createdAt
      this._count = s._count ?? null
    },
  },

  persist: {
    storage: sessionStorage,
    paths: ['id'],
  },
})
