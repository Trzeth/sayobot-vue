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
            v-on:keydown.enter="search"
            v-model="searchOptine"
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

    <div class="player-warpper">
      <music-player></music-player>
    </div>
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
import MusicPlayer from "@/components/MusicPlayer";

BScroll.use(Pullup);
BScroll.use(MouseWheel);
BScroll.use(ScrollBar);
BScroll.use(ObserveDom);

export default {
  name: "home",
  components: {
    MusicPlayer
  },
  data: function() {
    return {
      isCurrentViewOpen: false,
      currentView: null,
      popupComponentOptine: null,
      packageData: null,
      popupViewOptine: null,
      searchOptine: null
    };
  },
  methods: {
    search: function() {
      this.$router.push("/search?keyword=" + this.searchOptine);
    }
  },
  watch: {
    "$route.query.key": {
      immediate: true,
      deep: true,
      handler: function() {
        this.searchOptine = this.$route.query.keyword;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/view.scss";

.nav {
  position: fixed;
  top: 0;
  z-index: 2;
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

.player-warpper {
  position: fixed;
  bottom: 50px;
  left: 150px;
}
</style>
