const routes = [{
        path: "/admin/dashboard",
        name: "adminDashboard",
        // route level code-splitting
        // this generates a separate chunk (Register.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
            default: () =>
                import ("../views/admin/DashboardView.vue")
        }
    },
    {
        path: "/admin/schools",
        name: "adminSchools",
        // route level code-splitting
        // this generates a separate chunk (Register.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
            default: () =>
                import ("../views/admin/AdminSchoolsView.vue")
        }
    },
    {
        path: "/admin/staffs",
        name: "adminStaffs",
        // route level code-splitting
        // this generates a separate chunk (Register.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
            default: () =>
                import ("../views/admin/AdminStaffsView.vue")
        }
    },
    {
        path: "/admin/settings",
        name: "adminSettings",
        // route level code-splitting
        // this generates a separate chunk (Register.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        components: {
            default: () =>
                import ("../views/admin/AdminSettingsView.vue")
        }
    },
];
export default routes;