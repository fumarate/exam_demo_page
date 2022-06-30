import PaperEdit from "../components/PaperEdit.vue";
import PaperView from "../components/PaperView.vue";
import HomeView from "../components/HomeView.vue";
import LoginFragment from "../components/LoginFragment.vue";
import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  { path: "/edit", name: "edit", component: PaperEdit },
  { path: "/view", name: "view", component: PaperView },
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginFragment },
];
export default createRouter({
  history: createWebHashHistory(),
  routes,
});
