import { defineStore } from "pinia";

import $Api from "@/api";

const student = $Api.schoolAdmin.student;

export const useStudent = defineStore("SchoolAdminStudent", {
  state: () => ({
    students: null,
    student: null,
  }),
  getters: {},
  actions: {
    async createStudent(payload) {
      const { data } = await student.addAStudent(payload);
      this.student = data.data;
      return data;
    },

    async updateStudent(studentId, payload) {
      const { data } = await student.updateAStudent(studentId, payload);
      this.student = data.data;
      return data;
    },

    async fetchAllStudents() {
      // console.log(student);
      const { data } = await student.getAllStudents();
      this.students = data.data;
      return data;
    },

    async fetchAStudentByID(studentId) {
      const { data } = await student.getAStudent(studentId);
      this.student = data.data;
      return data;
    },
    async deleteAStudent(studentId) {
      const { data } = await student.deleteAClassroom(studentId);
      this.students = data.data;
      return data;
    },
  },
  persist: true,
});
