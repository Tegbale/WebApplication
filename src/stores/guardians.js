import { defineStore } from "pinia";

import $Api from "@/api";

const guardian = $Api.schoolAdmin.guardian;

export const useGuardian = defineStore("SchoolAdminGuardian", {
    state: () => ({
        guardians: null,
        guardian: null,
        attachedWard: null,
        detachedWard: null,
    }),
    getters: {
        getGuardians(state) {
            return state.guardians.data || [];
        },
        getGuardian(state) {
            return state.guardian;
        },
    },
    actions: {
        async createGuardian(payload) {
            const { data } = await guardian.addAGuardian(payload);
            this.guardian = data.data;
            return data;
        },

        async updateGuardian(guardianId, payload) {
            const { data } = await guardian.updateAGuardian(guardianId, payload);
            this.guardian = data.data;
            return data;
        },

        async fetchAllGuardians() {
            const { data } = await guardian.getAllGuardians();
            this.guardians = data.data;
            return data;
        },

        async fetchAGuardianByID(guardianId) {
            const { data } = await guardian.getAGuardian(guardianId);
            this.guardian = data.data;
            return data;
        },

        async deleteAGuardian(guardianId) {
            const { data } = await guardian.deleteAGuardian(guardianId);
            this.guardians = data.data;
            return data;
        },

        async attachStudentToGuardian(requestData) {
            const { data } = await guardian.attachStudentToGuardian(requestData);
            this.attachedWard = data.data;
            return data;
        },

        async detachStudentFromGuardian(requestData) {
            const { data } = await guardian.detachStudentFromGuardian(requestData);
            this.detachedWard = data.data;
            return data;
        }

    },
    persist: true,
});