import { defineStore } from "pinia";

import school from "@/api/school";

export const useSchoolStore = defineStore("school", {
    state: () => ({
        id: null,
        name: null,
        address: null,
        phone: null,
        contact_email: null,
        contact_name: null,
        location: null,
        AllSchools: null,
    }),

    getters: {
        getSchoolDetails() {
            return {
                id: this.$state.id,
                name: this.$state.name,
                // address: this.$state.address,
                // phone: this.$state.phone,
                contact_email: this.$state.contact_email,
                contact_name: this.$state.contact_name,
                location: this.$state.location,
            };
        },

        // get every school from the dB
        getAllSchool() {
            return this.$state.AllSchools
        }
    },
    actions: {
        async addSchool(payload) {
            const res = await school.addSchool(payload);
            this.setSchoolDetails(res);

            return res;
        },
        // udpate a school
        async updateSchool(payload, id) {
            const res = await school.updateSchool(payload, id);
            return res;
        },

        // set school details
        async setSchoolDetails(res) {
            (this.$state.id = res.data.data.id),
            (this.$state.name = res.data.data.name),
            // (this.$state.address = res.data.data.address),
            // (this.$state.phone = res.data.data.phone),
            (this.$state.contact_email = res.data.data.contact_email),
            (this.$state.contact_name = res.data.data.contact_name),
            (this.$state.location = res.data.data.location);
        },
        // fetch all schools in the database

        async fetchAllSchools() {
            const { data } = await school.fetchSchools();
            return data
        }

    },
});