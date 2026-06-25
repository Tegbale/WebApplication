import api from './axios'

export default {
  getSchool(id) {
    return api().get(`/schools/${id}`)
  },

  updateSchool(id, payload) {
    return api().patch(`/schools/${id}`, payload)
  },
}
