// stores/user-store.js
import { defineStore } from "pinia";
import user from "@/api/user";

export const useUsersStore = defineStore("user", {
    state: () => ({
        id: null,
        firstname: null,
        lastname: null,
        fullname: null,
        phone: null,
        gender: null,
        role: null,
        photo: null,
        token: null,
        email: null,
        email_verification_status: null,
        profile: {
            user_id: null,
        },
    }),
    actions: {
        async login(payload) {
            const res = await user.login(payload);
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
            (this.$state.email_verification_status =
                res.data.data.email_verification_status),
            (this.$state.token = res.data.token),
            (this.$state.role = res.data.data.role),
            (this.$state.photo = res.data.data.photo);
        },

        async updateUserDetail(payload) {
            const res = await user.updateUserDetails(payload);
            return res;
        },

        async fetchUserDetails() {
            const res = await user.fetchUserDetails();

            (this.$state.id = res.data.data.id),
            (this.$state.firstname = res.data.data.firstname),
            (this.$state.lastname = res.data.data.lastname),
            (this.$state.fullname = res.data.data.fullname),
            (this.$state.phone = res.data.data.phone),
            (this.$state.email = res.data.data.email),
            (this.$state.gender = res.data.data.gender);
            this.$state.photo = res.data.data.photo;
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
            (this.$state.profile.user_id = null);
        },

        async requestPasswordReset(payload) {
            const res = await user.requestPasswordReset(payload);
            return res;
        },

        async resetPassword(payload) {
            const res = await user.resetPassword(payload);
            return res;
        },
    },

    persist: true,
});