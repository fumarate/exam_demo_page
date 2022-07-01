import PaperEdit from "../components/PaperEdit.vue";
import AnswerList from "../components/AnswerList.vue";
import PaperAnswer from "../components/PaperAnswer.vue";
import HomeView from "../components/HomeView.vue";
import LoginFragment from "../components/LoginFragment.vue";
import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  { path: "/edit", name: "edit", component: PaperEdit },
  { path: "/view", name: "view", component: AnswerList },
  { path: "/answer", name: "answer", component: PaperAnswer },
  { path: "/", name: "home", component: HomeView },
  { path: "/login", name: "login", component: LoginFragment },
];
export default createRouter({
  history: createWebHashHistory(),
  routes,
});
