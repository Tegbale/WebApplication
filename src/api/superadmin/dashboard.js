import api from "@/api/axios.js";

const dashboard = {
    // get Dashboard Metrics
    getDashboardMetric() {
        return api().get("/account/admin/dashboard-metrics", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
    }
};

export default dashboard;