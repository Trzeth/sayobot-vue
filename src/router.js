import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Search from "./views/Search";
import Setting from "./views/Setting";
import Support from "./views/Support";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/search/:queryMode",
			name: "search",
			component: Search
		},
		{
			path: "/search",
			redirect: "/search/home"
		},
		{
			path: "/setting/:queryMode",
			name: "setting",
			component: Setting
		},
		{
			path: "/setting",
			redirect: "/setting/general"
		},
		{
			path: "/support",
			name: "support",
			component: Support
		},
		{
			path: "/home/:queryMode",
			name: "home",
			component: Home
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
