//middleware for admin routes using pinia store to check if role is superadmin

import { useAuthStore } from "@/stores/auth";

export default function admin({ next, router }) {
  const admin = useAuthStore().user;
  
  // console.log(admin.role);

  if (admin.role !== "superadmin") {
    return router.push({ name: "login" });
  }

  return next();
}
