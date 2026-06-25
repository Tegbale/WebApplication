import api from './axios'

export default {
  getStudents(params) {
    return api().get('/students', { params })
  },

  createStudent(payload) {
    return api().post('/students', payload)
  },

  updateStudent(id, payload) {
    return api().patch(`/students/${id}`, payload)
  },

  deleteStudent(id) {
    return api().delete(`/students/${id}`)
  },
  bulkImport(formData) {
    return api().post('/students/bulk-import', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
}
