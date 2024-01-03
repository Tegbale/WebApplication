import { defineStore } from "pinia";
import $Api from "@/api";

const superAdmin = $Api.superAdmin.users;

export const useUserStore = defineStore("users", {
  state: () => ({
    user: null,
    users: null,
    usersByRole: null,
  }),
  getters: {
    allUsers: (state) => state.users,
    allUsersByRole: (state) => state.usersByRole,
    schooladmin: (state) =>
      state.users.data.filter((user) => user.role === "schooladmin"),
  },
  actions: {
    async createNewUser(payload) {
      const { data } = await superAdmin.addNewUser(payload);
      this.setUserDetails(data.data);
      return data;
    },

    setUserDetails(data) {
      this.user = data;
    },

    async updateUserDetails(id, payload) {
      const { data } = await superAdmin.updateUser(id, payload);
      this.setUserDetails(data.data);
      return data;
    },

    async getUserById(id) {
      const { data } = await superAdmin.getSingleUser(id);
      // console.log(res);
      this.setUserDetails(data.data);
      return data;
    },

    clearUserDetails() {
      this.user = null;
      // Clear other properties related to profile and user_id
    },

    async getUserByRole(role, page) {
      const { data } = await superAdmin.getSingleUserByRole(role, page);
      this.usersByRole = data.data;
      return data;
    },

    async getAllUsers(page = 1) {
      console.log("page", page);
      const { data } = await superAdmin.fetchAllUsers(page);

      this.users = data.data;
      return data;
    },


    async deleteAUser(id) {
      const { data } = await superAdmin.deleteUserById(id);

      // Perform necessary actions with the response
      this.clearUserDetails();
      return data;
    },
  },
  persist: true,
});
