import { defineStore } from "pinia";

import $Api from "@/api";

const teacher = $Api.schoolAdmin.teacher;

export const useTeacher = defineStore("SchoolAdminTeacher", {
  state: () => ({
    teachers: null,
    teacher: null,
  }),
  getters: {},
  actions: {
    async createTeacher(payload) {
      const { data } = await teacher.addATeacher(payload);
      this.teacher = data.data;
      return data;
    },

    async updateTeacher(teacherId, payload) {
      const { data } = await teacher.updateATeacher(teacherId, payload);
      this.teacher = data.data;
      return data;
    },

    async fetchAllTeachers() {
      // console.log(teacher);
      const { data } = await teacher.getAllTeachers();
      this.teachers = data.data;
      return data;
    },

    async fetchATeacherByID(teacherId) {
      const { data } = await teacher.getATeacher(teacherId);
      this.teacher = data.data;
      return data;
    },
    async deleteATeacher(teacherId) {
      const { data } = await teacher.deleteAClassroom(teacherId);
      this.teachers = data.data;
      return data;
    },
  },
  persist: true,
});
