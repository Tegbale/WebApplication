//middleware for guest routes using pinia store to check if the user id is null, if it is null, then the admin is not logged in and the route is redirected to the login page

import { useUsersStore } from "@/stores/user-store";



export default function auth({ next, router }) {
    const user = useUsersStore();

    if (!user.id) {
        return router.push({ name: "login" });
    }

    return next();
}