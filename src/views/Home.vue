<template>
  <div>
    <header v-bind:class="{'header-fixed':navFixed}" v-on:wheel="headerScroll">
      <div class="title">
        <h1>Sayobot</h1>
        <h2>osu!镜像站</h2>
        <div>支持|当前捐助进度条</div>
        <h1>当前捐助进度条</h1>
        <h1>Sayobot</h1>
      </div>
      <div ref="nav" class="nav">
        <!-- 导航栏左半 选择模式 -->
        <div class="mode-seletor">
          <router-link class="btn" to="new">
            <span class="iconfont icon-fire"></span>
            最新谱面
          </router-link>
          <router-link class="btn" to="hot">
            <span class="iconfont icon-pushpin"></span>
            热门谱面
          </router-link>
        </div>

        <!-- 导航栏中间 搜索框 class="search-bar"-->
        <search-bar ref="searchBar" v-bind:searchOptine="searchOptine"></search-bar>

        <!-- 导航栏右半 工具栏 -->
        <div class="tools-bar">
          <!-- class="notice-bar" -->
          <notice-bar v-bind:notices="notices"></notice-bar>
          <!-- class="setting-bar" -->
          <setting-bar></setting-bar>
          <span class="btn" @click="test">Test</span>
        </div>
      </div>
    </header>

    <div id="main" v-bind:class="{'main-expanded':navFixed}">
      <div class="scroll" ref="scroll">
        <div class="scroll-content">
          <preview-card-list v-bind:beatmapsetList="beatmapsetList"></preview-card-list>
          <div class="pullup-wrapper">
            <div v-if="!isPullUpLoad" class="before-trigger">
              <span class="pullup-txt" @click="pullingUpHandler">加载更多</span>
            </div>
            <div v-else class="after-trigger">
              <span class="pullup-txt">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

/* Better Scroll Bar */
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import ScrollBar from "@better-scroll/scroll-bar";
import MouseWheel from "@better-scroll/mouse-wheel";
import ObserveDom from "@better-scroll/observe-dom";

/* Components */
import PreviewCardList from "@/components/PreviewCardList";
import SearchBar from "@/components/SearchBar";
import SettingBar from "@/components/SettingBar";
import NoticeBar from "@/components/NoticeBar";

BScroll.use(Pullup);
BScroll.use(MouseWheel);
BScroll.use(ScrollBar);
BScroll.use(ObserveDom);

export default {
  name: "home",
  components: {
    PreviewCardList,
    SearchBar,
    SettingBar,
    NoticeBar
  },
  data: function() {
    return {
      titleHeight: 0,
      isFirstView: true,
      navFixed: false,
      limit: 24,
      offset: 0,
      searchOptine: {
        keyword: "",
        subType: [],
        mode: [],
        class: [],
        genre: [],
        language: [],
        other: ""
      },
      current: {
        mode: "",
        searchOptine: {}
      },
      beatmapsetList: [],
      notices: [],
      isPullUpLoad: false
    };
  },
  mounted: function() {
    this.init();

    this.titleHeight = this.$refs.nav.offsetTop;
    axios.get("https://api.sayobot.cn/static/notice").then(response => {
      this.notices = response.data.data;
    });
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    test() {
      console.log(this.bs);
    },
    headerScroll(event) {
      if (event.deltaY > 0) this.bs.scrollTo(0, -1, 300);
    },
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollY: true,
        //click: true,
        probeType: 3,
        observeDom: true,
        scrollbar: true,
        mouseWheel: {
          speed: 0,
          invert: false,
          easeTime: 300
        },
        pullUpLoad: {
          threshold: -100
        }
      });
      this.bs.on("scroll", this.scrollHandler);
      this.bs.on("pullingUp", this.pullingUpHandler);
    },
    scrollHandler() {
      console.log(this.bs.y + " " + this.titleHeight);
      if (this.bs.y < 0) {
        this.navFixed = true;
      } else {
        this.navFixed = false;
      }
    },
    async pullingUpHandler() {
      this.isPullUpLoad = true;
      await this.requestData();
      this.bs.finishPullUp();
      this.bs.refresh();
      this.isPullUpLoad = false;
    },
    async requestData() {
      try {
        this.offset += this.limit;

        const newData = await axios.get(
          this.toUri(this.current, this.limit, this.offset)
        );
        this.beatmapsetList = this.beatmapsetList.concat(newData.data.data);
      } catch (err) {}
    },
    clear() {
      this.beatmapsetList = [];
    },
    toUri(params, limit, offset = 0) {
      var host = "https://api.sayobot.cn";
      var uri = host + "/beatmaplist";

      uri += "?0=" + limit;
      uri += "&";
      uri += "1=" + offset;
      uri += "&";
      uri += "2=" + params.mode;
      if (params.mode == 4) {
        var searchOptine = params.searchOptine;
        uri += "&";
        uri += "3=" + searchOptine.keyword;

        var temp = 0;
        temp = this.sum(searchOptine.subType);
        uri += temp ? "&4=" + temp : "";
        temp = this.sum(searchOptine.mode);
        uri += temp ? "&5=" + temp : "";
        temp = this.sum(searchOptine.class);
        uri += temp ? "&6=" + temp : "";
        temp = this.sum(searchOptine.genre);
        uri += temp ? "&7=" + temp : "";
        temp = this.sum(searchOptine.language);
        uri += temp ? "&8=" + temp : "";

        // To do other paramer
      }
      return uri;
    },
    sum(params) {
      var sum = 0;
      params.forEach(element => {
        sum += Number(element);
      });
      return sum;
    }
  },
  watch: {
    "$route.params.queryMode": {
      immediate: true,
      handler: function() {
        switch (this.$route.params.queryMode) {
          case "hot":
            this.current.mode = 1;
            break;
          case "new":
            this.current.mode = 2;
            break;
          case "search":
            //Watch by "$route.query"
            break;
        }
      }
    },
    "$route.query": {
      immediate: true,
      handler: function() {
        //Only watch search mode
        if (this.$route.params.queryMode == "search") {
          var query = this.$route.query;
          this.current.mode = 4;
          this.searchOptine.keyword = query.keyword;
          this.current.searchOptine = this.searchOptine;
        }
      }
    },
    current: {
      deep: true,
      immediate: true,
      handler: function() {
        console.log(this.current);
        axios.get(this.toUri(this.current, this.limit)).then(response => {
          this.beatmapsetList = response.data.data;
          this.$nextTick(() => {
            this.bs.refresh();
            if (this.isFirstView) {
              this.isFirstView = false;
            } else {
              this.bs.scrollTo(0, -1, 300);
            }
          });
        });
      }
    },
    navFixed: {
      handler: function() {
        this.$nextTick(() => {
          this.bs.refresh();
        });
        console.log("Re");
      }
    }
  }
};
</script>

<style lang="scss">
header {
  background: #ffffff;
  &.header-fixed {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background: white;
    box-shadow: 0 0 5px #dedede;
    z-index: 1;
    .title {
      max-height: 0;
      opacity: 0;
    }
  }

  .title {
    opacity: 1;
    overflow: hidden;
    max-height: 400px;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    text-align: center;
  }
  .nav {
    margin: 10px;
    display: flex;
    justify-content: space-evenly;
    align-content: center;

    .iconfont {
      font-size: 1.5rem;
      vertical-align: middle;
    }

    .mode-seletor {
      text-align: center;
      flex: 1;

      .btn.router-link-exact-active.router-link-active {
        background: #e8f5fe;
        color: #2da8f3;
        padding: 0 20px;
      }
      .btn.iconfont {
        margin-right: 5px;
      }
    }

    .search-bar {
      flex: 1;
    }

    .tools-bar {
      text-align: center;
      flex: 1;

      > div {
        display: inline-block;
      }

      .setting-bar {
        margin-left: 20px;
      }
    }

    /* Button Component */
    .btn {
      user-select: none !important;
      display: inline-block;
      margin: 0 10px;
      height: 50px;
      border-radius: 25px;
      text-decoration: none;
      line-height: 50px;
      padding: 0 15px;
      font-size: 1rem;
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      .iconfont {
        display: inline-block;
        height: 50px;
      }
    }

    .btn:visited {
      color: #000;
    }
    .btn:hover {
      background: #e8f5fe;
      color: #2da8f3;
    }
    .btn:active {
      background: #d2ecfc;
    }
  }
}
#main {
  position: fixed;
  top: 388.2px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;

  &.main-expanded {
    top: 75px;
  }
  .scroll {
    position: relative;
    height: 100%;
  }
  .pullup-wrapper {
    padding: 20px 0 50px 0;
    text-align: center;

    .pullup-txt {
      display: inline-block;
      padding: 10px;
      border: 1px dashed #dfdfdf;
    }
  }
}
</style>
