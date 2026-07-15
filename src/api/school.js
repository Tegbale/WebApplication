import api from './axios'

export default {
  getAll(params) {
    return api().get('/schools', { params })
  },

  getSchool(id) {
    return api().get(`/schools/${id}`)
  },

  create(payload) {
    return api().post('/schools', payload)
  },

  updateSchool(id, payload) {
    return api().patch(`/schools/${id}`, payload)
  },

  toggleStatus(id) {
    return api().patch(`/schools/${id}/toggle-status`)
  },

  delete(id) {
    return api().delete(`/schools/${id}`)
  },
}
