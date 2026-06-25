import api from './axios'

export default {
  getParents(params) { return api().get('/parents', { params }) },
  getParent(id) { return api().get(`/parents/${id}`) },
  createParent(payload) { return api().post('/parents', payload) },
  updateParent(id, payload) { return api().patch(`/parents/${id}`, payload) },
  toggleParentStatus(id) { return api().patch(`/parents/${id}/toggle-status`) },
  deleteParent(id) { return api().delete(`/parents/${id}`) },
  assignWard(parentId, studentId) { return api().post(`/parents/${parentId}/wards`, { studentId }) },
  removeWard(parentId, studentId) { return api().delete(`/parents/${parentId}/wards/${studentId}`) },
  bulkImport(formData) { return api().post('/parents/bulk-import', formData, { headers: { 'Content-Type': 'multipart/form-data' } }) },
}
