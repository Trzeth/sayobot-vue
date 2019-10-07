<template>
  <div class="package-view view">
    <div class="left">
      <div class="preview-image">
        <div class="image" v-bind:style="{backgroundImage: 'url(' + packageData.cover + ')'}"></div>
      </div>
      <h2>图包介绍</h2>
      <p>{{packageData.description}}</p>
    </div>

    <div class="right">
      <div class="creator">
        <span></span>
        <span class="update-time">{{packageData.last_update}}</span>
      </div>
      <h2>{{packageData.title}}</h2>
      <div class="tags">
        <span class="tag" v-for="tag in packageData.tags">{{tag}}</span>
      </div>
      <div class="btn-group">
        <a class="btn">全部播放</a>
        <a class="btn">❤</a>
        <a class="btn">下载图包</a>
        <a class="btn">网易云歌单</a>
        <a class="btn">QQ音乐歌单</a>
        <a class="btn">分享</a>
      </div>
      <table class="beatmap-list">
        <tr>
          <th class="index" style="width:10%">5首</th>
          <th class="song-name" style="width:20%">歌曲</th>
          <th class="artist" style="width:20%">歌手</th>
          <th class="source" style="width:20%">来源</th>
          <th class="bpm" style="width:15%">BPM</th>
          <th class="length" style="width:15%">时长</th>
        </tr>
        <tr class="division"></tr>
        <template v-for="beatmap in packageData.sid_data">
          <tr>
            <td>
              <div class="index-warpper">
                <span class="index">{{beatmap.order}}</span>
              </div>
            </td>
            <td>{{beatmap.title}}</td>
            <td>{{beatmap.artist}}</td>
            <td>{{beatmap.source}}</td>
            <td>{{beatmap.bpm}}</td>
            <td>{{beatmap.length}}</td>
          </tr>
          <tr colspan="5">{{beatmap.recommandText}}</tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var Mock = require("mockjs");
Mock.mock("/api/packageinfo?0=15000", {
  status: 0,
  data: {
    pid: 15000, //谱面集合id
    cover: "https://cdn.sayobot.cn:25225/beatmaps/140662/covers/cover.jpg",
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
        order: 0,
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
        length: 185,
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

Mock.mock(/\/api\/packageinfo\?0=1500./g, {
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
  data: function() {
    return {
      packageData: {}
    };
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler: function() {
        axios
          .get("/api/packageinfo?0=" + this.$route.params.id)
          .then(response => {
            this.packageData = response.data.data;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/view.scss";

.package-view {
  display: flex;
  width: 100%;
  .left {
    padding: 10px;
    .preview-image {
      position: relative;
      width: 200px;

      &:hover {
        &::before {
          right: -10px;
          transform: scale(0.82);
        }
        &::after {
          right: -20px;
          transform: scale(0.7);
        }
      }
      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        transform-origin: 100% 50%;
        border-radius: 5px;
        transition: right 0.2s ease-in-out, transform 0.2s ease-in-out;
      }
      &::before {
        transform: scale(0.85);
        background-color: #d9d9d9;
        right: -6px;
      }
      &::after {
        content: "";
        transform: scale(0.73);
        background-color: #d9d9d9;
        right: -12px;
        opacity: 0.5;
      }

      .image {
        background-position: center;
        background-size: cover;
        border-radius: 5px;
        display: block;
        width: 200px;
        height: 150px;
        position: relative;
        z-index: 1;
        margin: 0 auto;
      }
    }
  }
  .right {
    .beatmap-list {
      width: 100%;

      > .index {
        text-align: center;
      }
      .song-name,
      .artist,
      .source,
      .bpm,
      .length {
        text-align: left;
      }

      .index-warpper {
        text-align: center;
        .index {
        }
      }
    }
  }
}
</style>