import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Login from "./views/Login";
import DefaultView from "./views/homeViews/DefaultView";
import PackageView from "./views/homeViews/PackageView";
Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/login",
			name: "login",
			component: Login
		},
		{
			path: "/",
			name: "home",
			component: Home,
			children: [
				{ path: "", component: DefaultView },
				{ path: "package/:id", component: PackageView }
			]
		}
	]
});
