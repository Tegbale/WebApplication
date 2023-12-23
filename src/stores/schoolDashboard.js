import { defineStore } from "pinia";

import $Api from "@/api";

const schoolAdmin = $Api.schoolAdmin.dashboard;

export const useSchDashboard = defineStore("schooldashboard", {
  state: () => ({
    schDashboard: null,
  }),
  getters: {
    getMetricsData: (state) => state.schDashboard,
  },
  actions: {
    async fetchDashboardMetrics() {
      const { data } = await schoolAdmin.getDashboardMetric();
      this.schDashboard = data.data;
      return data;
    },
  },
  persist: true,
});
