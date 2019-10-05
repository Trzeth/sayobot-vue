<template>
  <div class="package-view" v-on:click.stop>
    <h2>{{packageData.title}}</h2>
    <h3>{{packageData.creator}}</h3>
    <p>{{packageData.description}}</p>
    <ul>
      <li>
        <span>Netease Icon</span>
      </li>
      <li>
        <span>QQMusic Icon</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
var Mock = require("mockjs");

Mock.mock("/api/package?pid=15000", {
  status: 0,
  data: {
    pid: 15000, //谱面集合id
    last_update: 1546349966, //谱面最后更新时间
    sids_amount: 5, //此谱面集合中的谱面数量
    title: "Test Package 1", //标题
    creator: "Trzeth", //艺术家
    creator_id: 6280862, //作图者的id
    linked_playlist: {
      netease: {
        title: "Test Package 1",
        creator: "Trzeth",
        creator_id: 201586,
        list_id: 3005086623
      },
      qq: {
        title: "Test Package 1",
        creator: "Trzeth",
        creator_id: -1,
        list_id: "7188050553"
      }
    },
    "sid_data|5": [
      {
        recommandText: "I like it",
        title: "Test Song 1",
        artist: "Test Artist",
        creator: "Test Creator",
        creator_id: 0,
        sid: 886402, //谱面集合id
        local_update: 1551777915, //最后检查更新时间
        bids_amount: 5, //此谱面集合中的谱面数量
        approved: 1, //rank状态
        titleU: "", //标题 Unicode
        artistU: "鹿乃", //艺术家 Unicode
        source: "", //提供方/专辑/……
        last_update: 1546349966, //谱面最后更新时间
        approved_date: 1546802404, //Ranked时间
        bpm: 184.0, //bpm
        favourite_count: 44, //收藏数
        video: 0, //是否有视频
        storyboard: 0, //是否有storyboard
        preview: 0, //是否有预览
        tags:
          "pop japanese alstroemeria アルストロメリア agatsu minorsonek m2usonek rvmathew nelliel" //一大堆标签"language":3,/*//语言
      }
    ],
    star_range: "5*~10*",
    description: "This is a test",
    favourite_count: 44, //收藏数
    tags: ["pop", "japanese", "alstroemeria", "アルストロメリア"]
  }
});
Mock.mock(/\/api\/package\?pid=1500./g, {
  status: 0,
  data: {
    pid: 15000, //谱面集合id
    last_update: 1546349966, //谱面最后更新时间
    sids_amount: 5, //此谱面集合中的谱面数量
    title: /Test Package \d/g, //标题
    creator: "Trzeth", //艺术家
    creator_id: 6280862, //作图者的id
    linked_playlist: {
      netease: {
        title: "Test Package 1",
        creator: "Trzeth",
        creator_id: 201586,
        list_id: 3005086623
      },
      qq: {
        title: "Test Package 1",
        creator: "Trzeth",
        creator_id: -1,
        list_id: "7188050553"
      }
    },
    "sid_data|5": [
      {
        recommandText: "I like it",
        title: "Test Song 1",
        artist: "Test Artist",
        creator: "Test Creator",
        creator_id: 0,
        sid: 886402, //谱面集合id
        local_update: 1551777915, //最后检查更新时间
        bids_amount: 5, //此谱面集合中的谱面数量
        approved: 1, //rank状态
        titleU: "", //标题 Unicode
        artistU: "鹿乃", //艺术家 Unicode
        source: "", //提供方/专辑/……
        last_update: 1546349966, //谱面最后更新时间
        approved_date: 1546802404, //Ranked时间
        bpm: 184.0, //bpm
        favourite_count: 44, //收藏数
        video: 0, //是否有视频
        storyboard: 0, //是否有storyboard
        preview: 0, //是否有预览
        tags:
          "pop japanese alstroemeria アルストロメリア agatsu minorsonek m2usonek rvmathew nelliel" //一大堆标签"language":3,/*//语言
      }
    ],
    star_range: "5*~10*",
    description: "This is a test",
    favourite_count: 44, //收藏数
    tags: ["pop", "japanese", "alstroemeria", "アルストロメリア"]
  }
});

export default {
  name: "package-view",
  props: ["optine"],
  data: function() {
    return {
      packageData: {}
    };
  },
  computed: {},
  watch: {
    optine: {
      immediate: true,
      handler: function() {
        console.log("chang");
        axios.get("/api/package?pid=" + this.optine.pid).then(response => {
          this.packageData = response.data.data;
        });
      }
    }
  }
};
</script>

<style lang="scss">
.package-view {
  background: white;
  width: 60%;
  justify-self: left;
}
</style>