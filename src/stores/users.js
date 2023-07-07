import { defineStore } from 'pinia'
import $Api from "@/api";

const superAdmin = $Api.superAdmin.users;

export const useUserStore = defineStore("users", {

    state: () => ({
        user: null,
        users: [],
        usersByRole: [],
    }),
    getters: {
        allUsers: (state) => state.users,
        allUsersByRole: (state) => state.usersByRole,
    },
    actions: {
        async createNewUser(payload) {
            const { data } = await superAdmin.addNewUser(payload);
            this.setUserDetails(data.data);
            return data;
        },

        setUserDetails(data) {
            this.user = data
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

        async getUserByRole(role) {
            const { data } = await superAdmin.getSingleUserByRole(role);
            this.usersByRole = data.data;
            return data;
        },

        async getAllUsers() {
            // console.log(superAdmin);
            const { data } = await superAdmin.fetchAllUsers();
            const usersArray = data.data.data;

            // const filteredUsers = usersArray.filter((user) => user.role !== "superadmin");

            this.users = usersArray.reverse();
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
}
);
