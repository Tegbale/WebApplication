//middleware for admin routes using pinia store to check if role is superadmin

import { useUsersStore } from "@/stores/user-store";

export default function admin({ next, router }) {
    const admin = useUsersStore();

    if (admin.role !== "superadmin") {
        return router.push({ name: "login" });
    }

    return next();
}