import api from "./axios";

export default {
    login(payload) {
        return api().post("/login", payload);
    },

    // fetch admin details
    fetchUserDetails() {
        return api().get("/account/profile", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    // update admin details
    updateUserDetails(payload) {
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
    }
};