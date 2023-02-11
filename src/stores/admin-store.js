// stores/user-store.js
import { defineStore } from "pinia";
import admin from "@/api/admin";

export const useAdminsStore = defineStore("admin", {
    state: () => ({
        id: null,
        firstname: null,
        lastname: null,
        fullname: null,
        phone: null,
        gender: null,
        role: null,
        photo: null,
        email: null,

        users: [],
        schools: [],
    }),

    getters: {
        AllUsers(state) {
            if (state.users && state.users.length > 0) {
                return state.users.filter((user) => user.role !== "superadmin");
            }
        },
    },
    actions: {
        // create a user
        async createNewUser(payload) {
            const res = await admin.createUser(payload);
            this.setUserDetails(res);

            return res;
        },

        async setUserDetails(res) {
            (this.$state.id = res.data.data.id),
            (this.$state.firstname = res.data.data.firstname),
            (this.$state.lastname = res.data.data.lastname),
            (this.$state.fullname = res.data.data.fullname),
            (this.$state.phone = res.data.data.phone),
            (this.$state.email = res.data.data.email),
            (this.$state.gender = res.data.data.gender),
            (this.$state.role = res.data.data.role);
        },

        // update user details by id
        async updateUserDetailById(id, payload) {
            const res = await admin.updateUserDetailById(id, payload);

            this.setUserDetails(res);
            return res;
        },

        // get a user by id
        async getUserById(id) {
            const res = await admin.getUser(id);
            this.setUserDetails(res);
            return res;
        },

        clearUserDetails() {
            (this.$state.id = null),
            (this.$state.firstname = null),
            (this.$state.lastname = null),
            (this.$state.fullname = null),
            (this.$state.phone = null),
            (this.$state.email = null),
            (this.$state.gender = null),
            (this.$state.email_verification_status = null),
            (this.$state.token = null),
            (this.$state.role = null),
            (this.$state.photo = null);
            this.$state.profile.user_id = null;
        },

        // get user by role
        async getUserByRole(role) {
            const res = await admin.getUserByRole(role);
            this.setUserDetails(res);
            return res;
        },

        // get all users
        async getAllUsers() {
            const { data } = await admin.getAllUsers();
            this.$state.users = data.data.data;
            return data;
        },
    },

    persist: true,
});