import auth from "@/router/middleware/auth";
import school from "@/router/middleware/school";

const routes = [
  {
    path: "/dashboard",
    name: "schoolDashboard",
    // route level code-splitting
    // this generates a separate chunk (Register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () => import("../views/schools/DashboardView.vue"),
    },
    meta: {
      middleware: [school, auth],
    },
  },
  {
    path: "/classrooms",
    name: "classrooms",
    // route level code-splitting
    // this generates a separate chunk (Register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () => import("../views/schools/ClassroomsView.vue"),
    },
    meta: {
      middleware: [school, auth],
    },
  },
  {
    path: "/classrooms/:id",
    name: "ClassroomDetails",
    // route level code-splitting
    // this generates a separate chunk (Register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () => import("../views/schools/classroomDetails.vue"),
    },
    meta: {
      middleware: [school, auth],
    },
  },
  {
    path: "/teachers",
    name: "teachers",
    // route level code-splitting
    // this generates a separate chunk (Register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () => import("../views/schools/TeachersView.vue"),
    },
    meta: {
      middleware: [school, auth],
    },
  },
  {
    path: "/students",
    name: "students",
    // route level code-splitting
    // this generates a separate chunk (Register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () => import("../views/schools/StudentsView.vue"),
    },
    meta: {
      middleware: [school, auth],
    },
  },
  {
    path: "/guardians",
    name: "guardians",
    // route level code-splitting
    // this generates a separate chunk (Register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () => import("../views/schools/GuardiansView.vue"),
    },
    meta: {
      middleware: [school, auth],
    },
  },
  {
    path: "/settings",
    name: "settings",
    // route level code-splitting
    // this generates a separate chunk (Register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () => import("../views/schools/StudentsView.vue"),
    },
    meta: {
      middleware: [school, auth],
    },
  },
];

export default routes;
