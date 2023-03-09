import api from "./axios";

export default {
  // Get all users

  getAllUsers() {
    return api().get("/account/admin/users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // create new user

  createUser(payload) {
    return api().post("/account/admin/users", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // edit user
  updateUser(id, payload) {
    return api().put("/account/admin/users/" + id, payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // delete user
  deleteUser(id) {
    return api().delete("/account/admin/users/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // get a single user
  getUser(id) {
    return api().get("/account/admin/users/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // get user by role
  getUserByRole(role) {
    return api().get("/account/admin/users/role/" + role, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};
