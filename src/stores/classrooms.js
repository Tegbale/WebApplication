import { defineStore } from "pinia";

import $Api from "@/api";

const classroom = $Api.schoolAdmin.classroom;

export const useClassroom = defineStore("SchoolAdminClassroom", {
  state: () => ({
    classroom: null,
    allClassrooms: null,
    student: null,
    teachersInAClass: null,
    studentsInAClass: null,
  }),
  getters: {
    // getMetricsData: (state) => state.schDashboard,

    // get all teachers assigned to a class
    getTeachers: (state) => state.classroom?.teachers,

    // get all students assigned to a class
    getStudents: (state) => state.classroom?.students,

    // get all teachers associated to a class
    getAllTeachersInAClass: (state) => state.teachersInAClass,

    // get all students in a class
    getAllStudentsInAClass: (state) => state.studentsInAClass,


  },
  actions: {
    async createClassroom(payload) {
      const { data } = await classroom.addAClassroom(payload);
      this.classroom = data.data;
      return data;
    },
    async updateClassroom(classroomId, payload) {
      const { data } = await classroom.updateAClassroom(classroomId, payload);
      this.classroom = data.data;
      return data;
    },
    async fetchAllClassrooms() {
      const { data } = await classroom.getAllClassrooms();
      this.allClassrooms = data.data;
      return data;
    },
    async fetchAClassroomById(classroomId) {
      const { data } = await classroom.getAClassroom(classroomId);
      this.classroom = data.data;
      return data;
    },
    async deleteAClassroom(classroomId) {
      const { data } = await classroom.deleteAClassroom(classroomId);
      this.classroom = null;
      return data;
    },
    async addStudentToClass(payload) {
      const { data } = await classroom.addStudentToClass(payload);
      return data;
    },
    async removeStudentFromClass(payload) {
      const { data } = await classroom.removeStudentFromClass(payload);
      return data;
    },
    async addTeacherToClass(payload) {
      const { data } = await classroom.addTeacherToClass(payload);
      return data;
    },
    async removeTeacherFromClass(payload) {
      const { data } = await classroom.removeTeacherFromClass(payload);
      return data;
    },

    async fetchAllMembersInAClass(classroomId) {
      const { data } = await classroom.getAllMembersInAClass(classroomId);
      this.teachersInAClass = data?.data?.teachers;
      this.studentsInAClass = data?.data?.students;
      console.log(data.data);
      return data;
    },
  },
  persist: true,
});
