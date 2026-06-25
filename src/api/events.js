import api from './axios'

export default {
  getEvents(params) {
    return api().get('/events', { params })
  },

  getEvent(id) {
    return api().get(`/events/${id}`)
  },

  createEvent(payload) {
    return api().post('/events', payload)
  },

  updateEvent(id, payload) {
    return api().patch(`/events/${id}`, payload)
  },

  deleteEvent(id) {
    return api().delete(`/events/${id}`)
  },
}
