<template>
  <div>
    <header class="nav">
      <router-link to="/">
        <div class="title">
          <h1>Sayobot</h1>
          <div class="text">
            <span class="sayo">Sayo</span>
            <span>bot</span>
          </div>
        </div>
      </router-link>
      <div class="splitter"></div>

      <div class="search-bar-warpper">
        <div class="search-bar">
          <label class="iconfont icon-search" for="search-bar-input"></label>
          <input
            id="search-bar-input"
            class="input"
            placeholder="搜索谱面"
            spellcheck="false"
            autocomplete="off"
          />
        </div>
      </div>

      <!-- class="login-bar" -->
      <router-link class="login-bar btn" to="/login">
        <span class="text">登陆/注册</span>
      </router-link>

      <!-- <router-link class="info-bar btn" to="setting">
        <span class="iconfont icon-infomation"></span>
      </router-link>-->

      <!-- class="setting-bar" -->
      <router-link class="setting-bar btn" to="setting">
        <span class="iconfont icon-setting"></span>
      </router-link>
    </header>

    <router-view></router-view>

    <popup-view v-bind:isOpen.sync="isCurrentViewOpen" v-bind:optine="popupViewOptine">
      <component
        v-bind:is="currentView"
        v-bind:isOpen.sync="isCurrentViewOpen"
        v-bind:optine="popupComponentOptine"
      ></component>
    </popup-view>
  </div>
</template>

<script>
import axios from "axios";
import { SearchtoUri, NoticeUri, SupportUri } from "@/util/api.js";

/* Better Scroll Bar */
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import ScrollBar from "@better-scroll/scroll-bar";
import MouseWheel from "@better-scroll/mouse-wheel";
import ObserveDom from "@better-scroll/observe-dom";

/* Components */
import PopupView from "@/components/PopupView";

/* Popup Views */
import Support from "./popupViews/Support.vue";
import DetailCard from "./popupViews/DetailCard.vue";
import Setting from "./popupViews/Setting.vue";
import PackageView from "./popupViews/PackageView.vue";

BScroll.use(Pullup);
BScroll.use(MouseWheel);
BScroll.use(ScrollBar);
BScroll.use(ObserveDom);

export default {
  name: "home",
  components: {
    PopupView,
    DetailCard,
    Setting,
    PackageView
  },
  data: function() {
    return {
      isCurrentViewOpen: false,
      currentView: null,
      popupComponentOptine: null,
      packageData: null,
      popupViewOptine: null
    };
  },
  methods: {},

  watch: {
    "$route.params.queryMode": {
      immediate: true,
      handler: function() {
        switch (this.$route.params.queryMode) {
          case "hot":
            //判定是否相等 防止视图刷新
            //Finding a better way to detail with
            this.current.mode == 1 ? 0 : (this.current.mode = 1);
            break;
          case "new":
            this.current.mode == 2 ? 0 : (this.current.mode = 2);
            break;
          case "search":
            this.isCurrentViewOpen = false;
            //Watch by "$route.query"
            break;
          case "setting":
            this.currentView = "setting";
            this.isCurrentViewOpen = true;
            break;
          case "support":
            this.currentView = "support";
            this.isCurrentViewOpen = true;
            break;
          case "beatmapset":
            //Handled by "$route.query"
            break;
        }
      }
    },
    "$route.query": {
      immediate: true,
      deep: true,
      handler: function() {
        //Only watch search mode
        if (this.$route.params.queryMode == "search") {
          var query = this.$route.query;

          //Finding a better way to detail with
          //防止触发页面刷新

          if (
            this.current.mode != 4 ||
            this.current.searchOptine.keyword != query.keyword
          ) {
            this.current.mode = 4;
            this.searchOptine.keyword = query.keyword;
            this.current.searchOptine = this._.clone(this.searchOptine);
          }
        }
        if (this.$route.params.queryMode == "package") {
          var query = this.$route.query;
          this.popupComponentOptine = { pid: query.pid };
          this.currentView = "package-view";
          this.isCurrentViewOpen = true;
          this.popupViewOptine = { justifyContent: "flex-end" };
        }
      }
    },
    current: {
      immediate: true,
      deep: true,
      handler: function() {
        axios.get(SearchtoUri(this.current, this.limit)).then(response => {
          this.beatmapsetList = response.data.data;
        });
      }
    },
    navFixed: {}
  },
  created: function() {
    axios.get(NoticeUri).then(response => {
      this.notices = response.data.data;
    });
    axios.get(SupportUri).then(response => {
      var data = response.data.data;

      this.support.total = data.total;
      this.support.target = data.target;
      this.support.percentage =
        (this.support.total / this.support.target) * 100;
    });
  }
};
</script>

<style lang="scss" scoped>
.btn {
  user-select: none !important;
  display: inline-block;
  margin: auto 10px;
  height: 50px;
  border-radius: 25px;
  text-decoration: none;
  line-height: 50px;
  padding: 0 15px;
  font-size: 1rem;
  color: #000;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  > .iconfont {
    font-size: 1.5rem;
    display: inline-block;
    height: 50px;
  }
  > .text {
    margin-left: 5px;
    font-size: 1rem;
    vertical-align: top;
    line-height: 50px;
  }
  &:visited {
    color: #000;
  }
  &:hover {
    background: #fff0f6;
    color: #f759ab;
  }
  &:active {
    background: #ffd6e7;
  }
}

$navHeight: 72px;

.nav {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: $navHeight;
  display: flex;
  align-items: center;
  background: #ffffff;

  .title {
    h1 {
      text-indent: -100%;
      position: absolute;
    }
    .text {
      margin: 10px 15px;
      font-size: 32px;
      font-weight: 400;
      letter-spacing: 2px;
      vertical-align: middle;
      position: relative;
      cursor: pointer;

      &:hover .sayo {
        background: #f759ab;
        color: #ffffff;
      }
      .sayo {
        font-size: 36px;

        box-sizing: border-box;
        display: inline-block;
        padding: 5px 5px;
        margin: 0 5px;
        border-radius: 10px;
        color: #f759ab;
        letter-spacing: 2px;
        transition: color 0.2s linear, background 0.2s linear;
      }
    }
  }

  .splitter {
    margin: auto 0;

    display: block;
    margin-right: 10px;
    height: 50%;
    border-left: 2px solid #595959;
  }
  .search-bar-warpper {
    margin-left: 20px;
    flex: 1;
    margin: 10px 15px;

    .search-bar {
      box-sizing: border-box;
      background: #f5f5f5;
      border-radius: 5px;
      align-items: center;
      display: flex;
      height: 100%;
    }

    .iconfont {
      font-size: 1.5rem;
      margin: 10px;
    }
    .input {
      flex: 1;
      outline: 0;
      border: 0;
      background: transparent;
      width: 100%;
      font-size: 1.2rem;
    }
  }

  .setting-bar {
  }

  .support-bar {
    color: #f759ab;
    > .text {
      font-weight: 600;
      font-size: 1.2rem;
    }
  }
}
</style>
