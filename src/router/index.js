import { createRouter, createWebHistory } from "vue-router";
import firebase from "@/firebase";

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: { layout: "empty" },
    component: () => import("../views/Login"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { layout: "empty" },
    component: () => import("../views/Register"),
  },
  {
    path: "/",
    name: "Home",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Home"),
  },
  {
    path: "/categories",
    name: "Categories",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Categories"),
  },
  {
    path: "/detail/:id",
    name: "Detail",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Detail"),
  },
  {
    path: "/history",
    name: "History",
    meta: { layout: "main", auth: true },
    component: () => import("../views/History"),
  },
  {
    path: "/planing",
    name: "Planning",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Planning"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Profile"),
  },
  {
    path: "/record",
    name: "NewRecord",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Record"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth.currentUser;
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
