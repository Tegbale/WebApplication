import api from "@/api/axios.js";

const dashboard = {
  // get school Dashboard Metrics
  getDashboardMetric() {
    return api().get("/account/schooladmin/dashboard-metrics", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  },
};

export default dashboard;
