import { defineStore } from "pinia";

import $Api from "@/api";

const superAdmin = $Api.superAdmin.dashboard;

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    dashboard: null,
  }),
  getters: {
    getMetricsData: (state) => state.dashboard,
  },
  actions: {
    async fetchDashboardMetrics() {
      const { data } = await superAdmin.getDashboardMetric();
      this.dashboard = data.data;
      return data;
    },
  },
  persist: true,
});
