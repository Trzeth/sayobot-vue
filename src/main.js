import Vue from "vue";
import App from "./App.vue";
import VueLocalStorage from "vue-localstorage";
import _ from "loadsh";
import "./assets/style/iconfont.css";
import "./assets/style/style.scss";
import Vuex from "vuex";
import router from "./router";
import meta from "vue-meta";

Vue.config.productionTip = false;
Vue.prototype._ = _;
Vue.use(VueLocalStorage, {
	bind: true
});

Vue.use(meta, {
	// optional pluginOptions
	refreshOnceOnNavigation: true
});
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		playList: [],
		currentPos: -1
	},
	mutations: {
		addMusic(state, music) {
			state.playList.push(music);
			state.currentPos += 1;
		},
		addMusicList(state, list) {
			state.playList.concat(list);
			state.currentPos = 0;
		},
		clear(state) {
			state.playList = [];
			state.currentPos = -1;
		}
	}
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
