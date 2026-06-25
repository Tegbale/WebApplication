import api from './axios'

export default {
  submit(payload) {
    return api().post('/school-requests', payload)
  },
}
