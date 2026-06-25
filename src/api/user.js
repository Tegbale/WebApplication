import api from './axios'

export default {
  login(payload) {
    return api().post('/auth/login', payload)
  },

  register(payload) {
    return api().post('/auth/register', payload)
  },

  getMe() {
    return api().get('/auth/me')
  },

  logout(refreshToken) {
    return api().post('/auth/logout', { refreshToken })
  },

  refreshToken(refreshToken) {
    return api().post('/auth/refresh', { refreshToken })
  },

  changePassword(payload) {
    return api().patch('/auth/change-password', payload)
  },
}
