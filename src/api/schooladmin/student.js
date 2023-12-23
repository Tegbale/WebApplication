import api from "@/api/axios";

const student = {
  // add a student..
  addAStudent(payload) {
    return api().post("/account/schooladmin/student", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  // update a student..
  updateAStudent(studentId, payload) {
    return api().put(`/account/schooladmin/student/${studentId}`, payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // get all students..
  getAllStudents() {
    return api().get(`/account/schooladmin/student`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // get a student instance..
  getAStudent(studentId) {
    return api().get(`/account/schooladmin/student/${studentId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // delete a student instance..
  deleteAClassroom(studentId) {
    return api().delete(`/account/schooladmin/student/${studentId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};

export default student;
