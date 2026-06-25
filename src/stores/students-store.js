import { defineStore } from 'pinia'
import studentsApi from '@/api/students'

export const useStudentsStore = defineStore('students', {
  state: () => ({
    students: [],
    meta: { total: 0, page: 1, limit: 50, totalPages: 0 },
    loading: false,
  }),

  actions: {
    async fetchAll(params) {
      this.loading = true
      try {
        const { data } = await studentsApi.getStudents(params)
        this.students = data.data
        this.meta = data.meta
      } finally {
        this.loading = false
      }
    },

    async createStudent(payload) {
      const { data } = await studentsApi.createStudent(payload)
      this.students.unshift(data.data)
      this.meta.total++
      return data.data
    },

    async deleteStudent(id) {
      await studentsApi.deleteStudent(id)
      this.students = this.students.filter((s) => s.id !== id)
      this.meta.total--
    },
  },
})
