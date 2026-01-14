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
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
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

export default router;
