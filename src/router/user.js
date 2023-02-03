const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (Register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () => import("../views/schools/DashboardView.vue"),
    },
  },
];

export default routes;
