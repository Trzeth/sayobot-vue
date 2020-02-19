import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Search from "./views/Search";
import Setting from "./views/Setting";
import Support from "./views/Support";

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/search/:queryMode?",
			name: "search",
			component: Search
		},
		{
			path: "/setting/:queryMode?",
			name: "setting",
			component: Setting
		},
		{
			path: "/support",
			name: "support",
			component: Support
		},
		{
			path: "/home/:queryMode?/:sid(\\d+)?",
			name: "home",
			component: Home
		},
		{
			path: "/",
			redirect: "/home"
		}
	]
});
