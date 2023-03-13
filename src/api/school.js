import api from "@/api/axios";

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
    updateSchool(id, payload) {
        return api().post(`/account/admin/school/${id}`, payload, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    // get a single school detail
    getSchool(id) {
        return api().get(`account/admin/school/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
    },

    // fetch all schools
    fetchSchools() {
        return api().get("/account/admin/school", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    // delete a school
    deleteSchoolById(id) {
        return api().delete(`/account/admin/school/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    }
}