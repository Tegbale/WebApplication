import api from "@/api";

export default {
    // add a school endpoint
    addSchool(payload) {
        return api().post("/account/admin/school", payload, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    // update a school endpoint using the school id
    updateSchool(payload, id) {
        return api().put(`/account/admin/school/${id}`, payload, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    // fetch all schools
    fetchSchools() {
        return api().get("/account/admin/school", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },
};