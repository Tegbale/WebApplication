import api from './axios'

export default {
  getAll(params) {
    return api().get('/classrooms', { params })
  },

  getOne(id) {
    return api().get(`/classrooms/${id}`)
  },

  create(payload) {
    return api().post('/classrooms', payload)
  },

  update(id, payload) {
    return api().patch(`/classrooms/${id}`, payload)
  },

  remove(id) {
    return api().delete(`/classrooms/${id}`)
  },
  bulkImport(formData) {
    return api().post('/classrooms/bulk-import', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
}
