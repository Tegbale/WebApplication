import { defineStore } from "pinia";

import $Api from "@/api";

const superAdmin = $Api.superAdmin.school;

export const useSchoolStore = defineStore("schools", {
  // Define your state and actions specific to the school
  state: () => ({
    // State properties
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
    // Getters properties
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
      return this.$state.AllSchools;
    },
  },
  actions: {
    async addSchool(payload) {
      const { data } = await superAdmin.addSchool(payload);
      let result = data.data;
      console.log(result);
      this.setSchoolDetails(result);

      return data;
    },
    // update a school
    async updateSchool(id, payload) {
      const { data } = await superAdmin.updateSchool(id, payload);
      let result = data.data;
      this.setSchoolDetails(result);
      return data;
    },

    // get a school details
    async fetchSchool(id) {
      const { data } = await superAdmin.getSchool(id);
      let schoolDetails = data.data;
      this.setSchoolDetails(schoolDetails);

      return data;
    },

    // delete a school data
    async deleteSchool(id) {
      const { data } = await superAdmin.deleteSchoolById(id);

      return data;
    },

    // set school details
    async setSchoolDetails(data) {
      (this.$state.id = data.id),
        (this.$state.name = data.name),
        // (this.$state.address = data.address),
        // (this.$state.phone = data.phone),
        (this.$state.contact_email = data.contact_email),
        (this.$state.contact_name = data.contact_name),
        (this.$state.location = data.location);
    },
    // fetch all schools in the database

    async fetchAllSchools() {
      const { data } = await superAdmin.fetchSchools();
      return data;
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ["id"],
  },
});
