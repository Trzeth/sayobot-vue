import Vue from "vue";
import App from "./App.vue";
import VueLocalStorage from "vue-localstorage";
import _ from "loadsh";
import "./assets/style/iconfont.css";
import "./assets/style/style.scss";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.prototype._ = _;
Vue.use(VueLocalStorage, {
	name: "ls"
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

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount("#app");
