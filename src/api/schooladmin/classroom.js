import api from "@/api/axios";

const classrooms = {
  // add a classroom..
  addAClassroom(payload) {
    return api().post("/account/schooladmin/classroom", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // update a classroom..
  updateAClassroom(classroomId, payload) {
    return api().put(`/account/schooladmin/classroom/${classroomId}`, payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // get all classrooms..
  getAllClassrooms() {
    return api().get(`/account/schooladmin/classroom`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // get a classroom instance..
  getAClassroom(classroomId) {
    return api().get(`/account/schooladmin/classroom/${classroomId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // delete a classroom instance..
  deleteAClassroom(classroomId) {
    return api().delete(`/account/schooladmin/classroom/${classroomId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // add a student to a classroom instance..
  addStudentToClass(payload) {
    return api().post(`/account/schooladmin/classroom/student/add`, payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // add a teacher to a classroom instance..
  addTeacherToClass(payload) {
    return api().post(`/account/schooladmin/classroom/teacher/add`, payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // remove a student from a classroom instance..
  removeStudentFromClass(payload) {
    return api().post(
      `/account/schooladmin/classroom/student/remove`,
      payload,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  // remove a teacher from a classroom instance..
  removeTeacherFromClass(payload) {
    return api().post(
      `/account/schooladmin/classroom/teacher/remove`,
      payload,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  },

  // get all the Members associated to a class
  getAllMembersInAClass(classroomId) {
    return api().get(`/account/schooladmin/classroom/${classroomId}/members`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

  },
};

export default classrooms;
