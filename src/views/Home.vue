<template>
  <div>
    <header>
      <div class="title">
        <h1>Sayobot</h1>
        <h2>Yet another sayobot website</h2>
      </div>
      <div class="nav">
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
        <search-bar v-bind:searchOptine="searchOptine"></search-bar>

        <!-- 导航栏右半 工具栏 -->
        <div class="tools-bar">
          <!-- class="notice-bar" -->
          <notice-bar v-bind:notices="notices"></notice-bar>
          <!-- class="setting-bar" -->
          <setting-bar></setting-bar>
        </div>
      </div>
    </header>

    <div id="main">
      <preview-card-list v-bind:beatmapsetList="beatmapsetList"></preview-card-list>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PreviewCardList from "@/components/PreviewCardList";
import SearchBar from "@/components/SearchBar";
import SettingBar from "@/components/SettingBar";
import NoticeBar from "@/components/NoticeBar";

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
      searchOptine: {
        limit: 24,
        offset: 0,
        keyword: "",
        subType: [],
        mode: [],
        class: [],
        genre: [],
        language: [],
        other: ""
      },
      current: "",
      beatmapsetList: [],
      notices: []
    };
  },
  methods: {
    clear() {
      this.beatmapsetList = [];
    }
  },
  watch: {
    "$route.params.queryMode": {
      immediate: true,
      handler: function() {
        switch (this.$route.params.queryMode) {
          case "hot":
            this.current = "https://api.sayobot.cn/beatmaplist?2=1";
            break;
          case "new":
            this.current = "https://api.sayobot.cn/beatmaplist?2=2";
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
          var src = "https://api.sayobot.cn/beatmaplist?0=100&2=4&3=${keyword}";
          this.current = src.replace("${keyword}", query.keyword);
          this.searchOptine.keyword = query.keyword;
        }
      }
    },
    current: {
      immediate: true,
      handler: function() {
        this.clear();
        axios.get(this.current).then(response => {
          this.beatmapsetList = response.data.data;
        });
      }
    }
  },
  created: function() {
    axios.get("https://api.sayobot.cn/static/notice").then(response => {
      this.notices = response.data.data;
    });
  }
};
</script>

<style lang="scss">
header {
  .title {
    text-align: center;
  }
  .search-bar {
    text-align: center;
  }
  .nav {
    margin: 10px 0 25px 0;
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
</style>
