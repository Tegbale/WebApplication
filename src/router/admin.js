import admin from "@/router/middleware/admin";
import auth from "@/router/middleware/auth";

const routes = [{
        path: "/admin/dashboard",
        name: "adminDashboard",
        // route level code-splitting
        // this generates a separate chunk (Register.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
            default: () =>
                import ("../views/admin/DashboardView.vue"),
        },
        meta: {
            middleware: [admin, auth],
            enterClass: "animate__animated animate__fadeIn",
            leaveClass: "animate__animated animate__fadeOut",


        },
    },
    {
        path: "/admin/schools",
        name: "adminSchools",
        // route level code-splitting
        // this generates a separate chunk (Register.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
            default: () =>
                import ("../views/admin/AdminSchoolsView.vue"),
        },

        meta: {
            middleware: [admin, auth],
        },
    },
    {
        path: "/admin/schools/:id",
        name: "schoolsDetails",
        // route level code-splitting
        // this generates a separate chunk (Register.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
            default: () =>
                import ("../views/admin/AdminSchoolsDetailsView.vue"),
        },
        meta: {
            middleware: [admin, auth],
        },
    },
    {
        path: "/admin/users",
        name: "adminUsers",
        // route level code-splitting
        // this generates a separate chunk (Register.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
            default: () =>
                import ("../views/admin/AdminUsersView.vue"),
        },
        meta: {
            middleware: [admin, auth],
        },
    },
    {
        path: "/admin/settings",
        name: "adminSettings",
        // route level code-splitting
        // this generates a separate chunk (Register.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
            default: () =>
                import ("../views/admin/AdminSettingsView.vue"),
        },
        meta: {
            middleware: [admin, auth],
        },
    },
];
export default routes;