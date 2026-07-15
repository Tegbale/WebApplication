import api from './axios'

export default {
  getAll(params) {
    return api().get('/messages', { params })
  },

  getOne(id) {
    return api().get(`/messages/${id}`)
  },

  send(payload) {
    return api().post('/messages', payload)
  },

  markConversationRead(partnerId) {
    return api().patch('/messages/read-conversation', { partnerId })
  },

  remove(id) {
    return api().delete(`/messages/${id}`)
  },
}
