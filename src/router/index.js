import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
//import ApplayoutView from "../views/ApplayoutView.vue";
import admin from "./admin";
import user from "./user";
import guest from "@/router/middleware/guest";
import middlewarePipeline from "@/router/middleware/middleware-pipeline";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [
        ...admin,
        ...user,
        {
            path: "/",
            name: "home",
            component: HomeView,
            meta: {
                transition: 'slide-down'
            }

        },
        // {
        //   path: "/about",
        //   name: "about",
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import("../views/AboutView.vue"),
        // },
        {
            path: "/login",
            name: "login",
            // route level code-splitting
            // this generates a separate chunk (Login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ("../views/Auth/LoginView.vue"),

            meta: {
                middleware: [guest],
                transition: 'slide-down'
            },
        },
        // /register removed — access is request-based, not self-signup
        { path: '/register', redirect: '/' },
    ],
});

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next();
    }

    const middleware = to.meta.middleware;

    const context = {
        to,
        from,
        next,
        router,
    };

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1),
    });
});

export default router;