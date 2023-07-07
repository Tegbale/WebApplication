// user.js in the auth directory inside the stores dir
import { defineStore } from 'pinia';
import $Api from "@/api";

const auth = $Api.auth.authuser;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      id: null,
      firstname: null,
      lastname: null,
      fullname: null,
      phone: null,
      gender: null,
      role: null,
      photo: null,
      email: null,
      emailVerificationStatus: null,
    },
    token: null,
  }),

  actions: {
    async login(payload) {
      const { data } = await auth.login(payload);
      // console.log(data);
      if (data.success) {
        this.setUserDetails(data.data, data.token);
      }

      return data;
    },

    setUserDetails(data, token) {
      const { id, firstname, lastname, fullname, phone, gender, role, photo, email, emailVerificationStatus } = data;

      this.user = {
        id,
        firstname,
        lastname,
        fullname,
        phone,
        gender,
        role,
        photo,
        email,
        emailVerificationStatus,
      };

      this.token = token;
    },

    async updateAuthDetails(payload) {
      const res = await auth.updateAuthDetails(payload);
      return res;
    },

    async fetchAuthDetails() {
      const res = await auth.fetchAuthDetails();
      const { data } = res;

      this.setUserDetails(data, this.token);
    },

    clearUserDetails() {
      this.user = {
        id: null,
        firstname: null,
        lastname: null,
        fullname: null,
        phone: null,
        gender: null,
        role: null,
        photo: null,
        email: null,
        emailVerificationStatus: null,
      };
      this.token = null;
    },

    async requestPasswordReset(payload) {
      const res = await auth.requestPasswordReset(payload);
      return res;
    },

    async resetPassword(payload) {
      const res = await auth.resetPassword(payload);
      return res;
    },
  },

  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },

    isAdmin(state) {
      return state.user.role === 'superadmin';
    },
  },

  persist: true,
});
