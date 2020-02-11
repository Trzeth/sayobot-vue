import Vue from "vue";
import App from "./App.vue";
import VueLocalStorage from "vue-localstorage";
import _ from "loadsh";
import "./assets/style/iconfont.css";
import "./assets/style/style.scss";
import router from "./router";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.prototype._ = _;
Vue.use(VueLocalStorage, {
  bind: true
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
