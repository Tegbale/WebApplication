import admin from "@/router/middleware/admin";
import auth from "@/router/middleware/auth";

const routes = [
  {
    path: "/admin/dashboard",
    name: "adminDashboard",
    components: { default: () => import("../views/admin/DashboardView.vue") },
    meta: { middleware: [admin, auth] },
  },
  {
    path: "/admin/classrooms",
    name: "adminClassrooms",
    components: { default: () => import("../views/admin/ClassroomsView.vue") },
    meta: { middleware: [admin, auth] },
  },
  {
    path: "/admin/teachers",
    name: "adminTeachers",
    components: { default: () => import("../views/admin/TeachersView.vue") },
    meta: { middleware: [admin, auth] },
  },
  {
    path: "/admin/students",
    name: "adminStudents",
    components: { default: () => import("../views/admin/AdminStudentsView.vue") },
    meta: { middleware: [admin, auth] },
  },
  {
    path: "/admin/schools",
    name: "adminSchools",
    components: { default: () => import("../views/admin/AdminSchoolsView.vue") },
    meta: { middleware: [admin, auth] },
  },
  {
    path: "/admin/schools/:id",
    name: "schoolsDetails",
    components: { default: () => import("../views/admin/AdminSchoolsDetailsView.vue") },
    meta: { middleware: [admin, auth] },
  },
  {
    path: "/admin/users",
    name: "adminUsers",
    components: { default: () => import("../views/admin/AdminUsersView.vue") },
    meta: { middleware: [admin, auth] },
  },
  {
    path: "/admin/parents",
    name: "adminParents",
    components: { default: () => import("../views/admin/ParentsView.vue") },
    meta: { middleware: [admin, auth] },
  },
  {
    path: "/admin/events",
    name: "adminEvents",
    components: { default: () => import("../views/admin/EventsView.vue") },
    meta: { middleware: [admin, auth] },
  },
  {
    path: "/admin/settings",
    name: "adminSettings",
    components: { default: () => import("../views/admin/AdminSettingsView.vue") },
    meta: { middleware: [admin, auth] },
  },
];

export default routes;
