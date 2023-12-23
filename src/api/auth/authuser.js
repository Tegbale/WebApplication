// authuser.js

import api from "@/api/axios.js";

const authuser = {
  login(payload) {
    return api().post("/login", payload);
  },

  // fetch admin details
  fetchAuthDetails() {
    return api().get("/account/profile", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // update admin details
  updateAuthDetails(payload) {
    return api().post("/account/profile", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },

  // Request password reset
  requestPasswordReset(payload) {
    return api().post("/request-reset-password", payload);
  },

  // Reset password
  resetPassword(payload) {
    return api().post("/reset-password", payload);
  },
};

export default authuser;
