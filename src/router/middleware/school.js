//middleware for admin routes using pinia store to check if role is superadmin

import { useAuthStore } from "@/stores/auth";

export default function school({ next, router }) {
  const user = useAuthStore().user;

  // console.log(admin.role);

  if (user.role !== "schooladmin") {
    return router.push({ name: "login" });
  }

  return next();
}
