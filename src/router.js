import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home";
import Search from "./views/Search";
import Setting from "./views/Setting";
import Support from "./views/Support";

// const Home = () => import("./views/Home");
// const Search = () => import("./views/Search");
// const Setting = () => import("./views/Setting");
// const Support = () => import("./views/Support");

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
