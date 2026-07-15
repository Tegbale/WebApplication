import { defineStore } from 'pinia'
import userApi from '@/api/user'

export const useUsersStore = defineStore('user', {
  state: () => ({
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    role: null,
    avatar: null,
    schoolId: null,
    accessToken: null,
    refreshToken: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.id && !!state.accessToken,
    fullName: (state) => state.firstName && state.lastName ? `${state.firstName} ${state.lastName}` : '',
    initials: (state) => state.firstName && state.lastName ? `${state.firstName[0]}${state.lastName[0]}` : '',
  },

  actions: {
    async login(payload) {
      const { data } = await userApi.login(payload)
      const { accessToken, refreshToken, user } = data.data
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this._setUser(user)
      return data
    },

    async register(payload) {
      const { data } = await userApi.register(payload)
      const { accessToken, refreshToken, user } = data.data
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this._setUser(user)
      return data
    },

    async fetchMe() {
      const { data } = await userApi.getMe()
      this._setUser(data.data)
      return data.data
    },

    async logout() {
      try {
        if (this.refreshToken) await userApi.logout(this.refreshToken)
      } catch {}
      this.clearUserDetails()
    },

    async updateProfile(payload) {
      const { data } = await userApi.updateProfile(payload)
      this._setUser(data.data)
      return data.data
    },

    async uploadAvatar(file) {
      const fd = new FormData()
      fd.append('avatar', file)
      const { data } = await userApi.uploadAvatar(fd)
      this._setUser(data.data)
      return data.data
    },

    _setUser(user) {
      this.id = user.id
      this.firstName = user.firstName
      this.lastName = user.lastName
      this.email = user.email
      this.phone = user.phone ?? null
      this.role = user.role
      this.avatar = user.avatar ?? null
      this.schoolId = user.schoolId ?? null
    },

    clearUserDetails() {
      this.$reset()
    },
  },

  persist: true,
})
