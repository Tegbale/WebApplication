import { defineStore } from "pinia";

import $Api from "@/api";

const student = $Api.schoolAdmin.student;

export const useStudent = defineStore("SchoolAdminStudent", {
  state: () => ({
    students: null,
    student: null,
    attachedParent: null,
  }),
  getters: {

    getStudents(state) {
      return state.students.data || [];
    },
    getStudent(state) {
      return state.student;
    },
  },
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
      const { data } = await student.deleteAStudent(studentId);
      // this.students = data.data;
      return data;
    },

    async attachParentToStudent(payload) {
      const { data } = await student.attachParentToStudent(payload);
      this.attachedParent = data.data;
      return data;
    },

    async detachParentFromStudent(payload) {
      const { data } = await student.detachParentFromStudent(payload);
      this.attachedParent = data.data;
      return data;
    }
  },
  persist: true,
});
