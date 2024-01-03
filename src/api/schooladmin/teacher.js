import api from "@/api/axios";

const teacher = {
  // add a teacher..
  addATeacher(payload) {
    return api().post("/account/schooladmin/teacher", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  // update a teacher..
  updateATeacher(teacherId, payload) {
    return api().put(`/account/schooladmin/teacher/${teacherId}`, payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // get all teachers..
  getAllTeachers() {
    return api().get(`/account/schooladmin/teacher`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // get a teacher instance..
  getATeacher(teacherId) {
    return api().get(`/account/schooladmin/teacher/${teacherId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // delete a teacher instance..
  deleteATeacher(teacherId) {
    return api().delete(`/account/schooladmin/teacher/${teacherId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};

export default teacher;
