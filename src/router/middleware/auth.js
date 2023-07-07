//middleware for guest routes using pinia store to check if the user id is null, if it is null, then the admin is not logged in and the route is redirected to the login page

import { useAuthStore } from "@/stores/auth";

export default function auth({ next, router }) {
  const user = useAuthStore().$state.user;

  // console.log(user);

  if (!user.id) {
    return router.push({ name: "home" });
  }

  return next();
}
