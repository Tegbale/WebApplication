import api from "@/api/axios";

const guardian = {
    // add a guardian..
    addAGuardian(payload) {
        return api().post("/account/schooladmin/guardian", payload, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },
    // update a guardian..
    updateAGuardian(guardianId, payload) {
        return api().put(`/account/schooladmin/guardian/${guardianId}`, payload, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    // get all guardians..
    getAllGuardians() {
        return api().get(`/account/schooladmin/guardian`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    // get a guardian instance..
    getAGuardian(guardianId) {
        return api().get(`/account/schooladmin/guardian/${guardianId}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    //   attach student to a guardian
    attachStudentToGuardian(payload) {
        return api().post("/account/schooladmin/guardian/ward/add", payload, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    // detach student from a guardian
    detachStudentFromGuardian(payload) {
        return api().post("/account/schooladmin/guardian/ward/remove", payload, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    }

};

export default guardian;

