import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Package from "./views/Package";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home/:queryMode",
      name: "home",
      component: Home
    },
    {
      path: "/Package",
      name: "package",
      component: Package
    },
    {
      path: "/home",
      redirect: "/home/new"
    },
    {
      path: "/",
      redirect: "/home"
    }
  ]
});
