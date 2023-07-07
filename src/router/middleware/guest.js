//middleware for guest routes using pinia store to check if the user id is null, if it is null, then the user is not logged in and the route is redirected to the login page

import { useAuthStore } from "@/stores/auth";

export default function guest({ next, router }) {
  const user = useAuthStore().$state.user;

  if (user.id && user.role !== "superadmin") {
    return router.push({ name: "dashboard" });
  } else if (user.id && user.role === "superadmin") {
    return router.push({ name: "adminDashboard" });
  }

  return next();
}
