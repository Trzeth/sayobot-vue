import Vue from "vue";
import Vuex from "vuex";
import downloader from "./modules/downloader";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: { downloader },
});
