import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import VueLocalStorage from "vue-localstorage";
import _ from "loadsh";
import "./styles/iconfont.css";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueGtag from "vue-gtag";

Vue.use(
	VueGtag,
	{
		config: { id: "UA-158385317-1" },
	},
	router
);

Vue.config.productionTip = false;
Vue.prototype._ = _;

Vue.use(VueLocalStorage, {
	name: "ls",
});

if (!Vue.ls.get("isUnicode")) {
	Vue.ls.set("isUnicode", false);
}
if (!Vue.ls.get("volume")) {
	Vue.ls.set("volume", 1.0);
}
if (!Vue.ls.get("downloadType")) {
	Vue.ls.set("downloadType", 0);
}
if (!Vue.ls.get("downloadServer")) {
	Vue.ls.set("downloadServer", 0);
}

if (!Vue.ls.get("isDrawerMini")) {
	Vue.ls.set("isDrawerMini", false);
}

if (!Vue.ls.get("lastConfirmedNotice")) {
	Vue.ls.set("lastConfirmedNotice", null);
}

if (!Vue.ls.get("previewCardStyle")) {
	Vue.ls.set("previewCardStyle", 0);
}

if (!Vue.ls.get("isPackageDownload")) {
	Vue.ls.set("isPackageDownload", false);
}

new Vue({
	router,
	vuetify,
	store,
	render: (h) => h(App),
}).$mount("#app");
