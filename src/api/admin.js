import api from './axios'

export default {
  getAllStaff(params) { return api().get('/staff', { params }) },
  getStaffMember(id) { return api().get(`/staff/${id}`) },
  createStaff(payload) { return api().post('/staff', payload) },
  updateStaff(id, payload) { return api().patch(`/staff/${id}`, payload) },
  toggleStaffStatus(id) { return api().patch(`/staff/${id}/toggle-status`) },
  deleteStaff(id) { return api().delete(`/staff/${id}`) },
  bulkImportStaff(formData, role = 'STAFF') { return api().post(`/staff/bulk-import?role=${role}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }) },
  searchUsers(q) { return api().get('/users/search', { params: { q } }) },
}
