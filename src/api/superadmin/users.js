import api from "@/api/axios";

const users = {
  // add a new user
  addNewUser(payload) {
    return api().post("/account/admin/users", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // Edit New user
  updateUser(id, payload) {
    return api().post(`/account/admin/users/${id}`, payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // delete a User
  deleteUserById(id) {
    return api().delete(`/account/admin/users/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // fetch all users
  fetchAllUsers(page) {
    return api().get(`/account/admin/users?page=${page}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // get a single user detail
  getSingleUser(id) {
    return api().get(`account/admin/users/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
  // get all users with same role
  getSingleUserByRole(role, page) {
    return api().get(`account/admin/users/${role}?page=${page}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};

export default users;
