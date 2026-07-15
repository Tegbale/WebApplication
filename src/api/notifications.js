import api from './axios'

export default {
  getAll(params) {
    return api().get('/notifications', { params })
  },

  markRead(id) {
    return api().patch(`/notifications/${id}/read`)
  },

  markAllRead() {
    return api().patch('/notifications/read-all')
  },
}
