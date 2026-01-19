import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import DashboardHome from "../views/DashboardHome.vue";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/LoginPage.vue"),
    meta: { guest: true },
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "DashboardHome",
        component: DashboardHome,
      },
      // Resepsionis Routes
      {
        path: "resepsionis",
        name: "Resepsionis",
        component: () => import("../views/dashboard/resepsionis/Index.vue"),
      },
      {
        path: "resepsionis/create",
        name: "ResepsionisCreate",
        component: () => import("../views/dashboard/resepsionis/Create.vue"),
      },
      {
        path: "resepsionis/:id/edit",
        name: "ResepsionisEdit",
        component: () => import("../views/dashboard/resepsionis/Edit.vue"),
      },
      // Tamu Routes
      {
        path: "tamu",
        name: "Tamu",
        component: () => import("../views/dashboard/tamu/Index.vue"),
      },
      {
        path: "tamu/create",
        name: "TamuCreate",
        component: () => import("../views/dashboard/tamu/Create.vue"),
      },
      {
        path: "tamu/:id/edit",
        name: "TamuEdit",
        component: () => import("../views/dashboard/tamu/Edit.vue"),
      },
      // Feedback Routes
      {
        path: "feedback",
        name: "Feedback",
        component: () => import("../views/dashboard/feedback/Index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("auth_token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";

  // Cek jika route memerlukan autentikasi (dashboard)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Redirect ke login jika belum login
      next({ name: "Login", query: { redirect: to.fullPath } });
    } else if (!isAdmin) {
      // Resepsionis tidak boleh akses dashboard, redirect ke landing page
      next({ name: "LandingPage" });
    } else {
      next();
    }
  }
  // Cek jika route hanya untuk guest (belum login)
  else if (to.matched.some((record) => record.meta.guest)) {
    if (isAuthenticated) {
      // Jika admin, redirect ke dashboard. Jika resepsionis, biarkan ke landing
      if (isAdmin) {
        next({ name: "DashboardHome" });
      } else {
        next({ name: "LandingPage" });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
