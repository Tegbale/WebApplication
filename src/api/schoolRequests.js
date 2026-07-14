import api from './axios'

export default {
  submit(payload) {
    const isFormData = payload instanceof FormData
    return api().post('/school-requests', payload, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    })
  },
}
