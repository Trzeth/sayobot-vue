import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Login from "./views/Login";

import DefaultView from "./views/homeViews/DefaultView";
import PackageView from "./views/homeViews/PackageView";
import BoardView from "./views/homeViews/BoardView";
import GenreView from "./views/homeViews/GenreView";
import SearchView from "./views/homeViews/SearchView";
import BeatmapsetView from "./views/homeViews/BeatmapsetView";
import SupportView from "./views/homeViews/SupportView";

import PackageListView from "./views/homeViews/list/PackageListView";
import ArtistListView from "./views/homeViews/list/ArtistListView";

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
				/* Default View */
				{ path: "", component: DefaultView },
				/* Package View */
				{ path: "package/:id", component: PackageView },
				/* Beatmapset View */
				{ path: "beatmapset/:id", component: BeatmapsetView },
				/* Genre View */
				{ path: "genre/:id", component: GenreView },
				{ path: "genre", redirect: "genre/any" },
				/* Search View */
				{ path: "search", component: SearchView },
				/* Board View */
				{ path: "board", component: BoardView },
				/* List / Package View */
				{ path: "list/package", component: PackageListView },
				/* List / Artist View */
				{ path: "list/artist", component: ArtistListView },
				/* Support */
				{ path: "support", component: SupportView }
			]
		}
	]
});
