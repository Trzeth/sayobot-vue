<template>
  <div class="recommend-bar">
    <div class="scroll">
      <div class="scroll-content" ref="scroll">
        <div class="beatmap-warpper" v-for="beatmap in recommendData" v-bind:key="beatmap.key">
          <div class="beatmap">
            <div
              class="preview-image"
              v-bind:style="{
      backgroundImage: 'url(https://cdn.sayobot.cn:25225/beatmaps/' + beatmap.sid + '/covers/cover.jpg'}"
            >
              <div class="shadow"></div>
            </div>
            <div class="recommand-warpper">
              <h2 class="title">Top 榜单</h2>
              <span class="text">NoName Player</span>
            </div>
            <div class="detail-warpper">
              <h2 class="title overflow-clip">{{beatmap.title}}</h2>
              <span class="artist overflow-clip">{{beatmap.artist}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

var Mock = require("mockjs");

Mock.mock("/api/beatmap", {
  status: 0,
  data: [
    {
      sid: 892003,
      title: "Black Night Town (TV Size)",
      titleU: "",
      artist: "Kondo Akihisa",
      artistU: "",
      recommendText: Mock.Random.sentence()
    },
    {
      sid: 1015169,
      title: "Insert Coin",
      titleU: "",
      artist: "Thaehan",
      artistU: "",
      recommendText: Mock.Random.sentence()
    },
    {
      sid: 1020800,
      title: "Crossfire",
      titleU: "",
      artist: "Stephen",
      artistU: "",
      recommendText: Mock.Random.sentence()
    },
    {
      sid: 921535,
      title: "Raven Haven",
      titleU: "",
      artist: "SOOOO",
      artistU: "",
      recommendText: Mock.Random.sentence()
    },
    {
      sid: 545139,
      title: "Harumodoki (TV Size)",
      titleU: "",
      artist: "yanaginagi",
      artistU: "",
      recommendText: Mock.Random.sentence()
    },
    {
      sid: 946446,
      title: "Cold Skin",
      titleU: "",
      artist: "Seven Lions & Echos",
      artistU: "",
      recommendText: Mock.Random.sentence()
    },
    {
      sid: 889438,
      title: "Rough & Laugh",
      titleU: "",
      artist: "clammbon",
      artistU: "",
      recommendText: Mock.Random.sentence()
    }
  ]
});

export default {
  name: "recommend-bar",
  data: function() {
    return {
      recommendData: null,
      currentEle: null,
      description: {
        title: null,
        artist: null,
        recommendText: null
      }
    };
  },
  mounted: function() {
    axios.get("/api/beatmap").then(response => {
      this.recommendData = response.data.data;
      this.description.recommendText = this.recommendData[0].recommendText;

      this.$nextTick(() => {
        this.initScroll();
      });
    });
  },
  methods: {
    initScroll: function() {
      let scroll = this.$refs.scroll;
      console.log(scroll);

      let children = scroll.children;
      console.log(children);
      console.log(children.length);
      this.currentEle = children[0];
      this.currentEle.classList.add("focus-div");

      this.description.recommendText = this.recommendData[0].recommendText;
      this.description.title = this.recommendData[0].title;
      this.description.artist = this.recommendData[0].artist;

      for (let i = 0; i != children.length; i++) {
        children[i].onclick = () => {
          this.description.recommendText = this.recommendData[i].recommendText;
          this.description.title = this.recommendData[i].title;
          this.description.artist = this.recommendData[i].artist;

          this.currentEle.classList.remove("focus-div");
          this.currentEle = children[i];
          this.currentEle.classList.add("focus-div");
          scroll.style.transform = "translateX(-" + i * 240 + "px)";
        };
      }
    }
  }
};
</script>

<style lang="scss">
.recommend-bar {
  .scroll {
    width: 100%;
    overflow: hidden;

    .scroll-content {
      padding: 10px 0;
      transition: transform 1s cubic-bezier(0.165, 0.84, 0.44, 1);
      display: flex;
      align-items: flex-end;
      height: 250px;

      .beatmap-warpper {
        flex: none;
        width: 240px;
        height: 140px;
        padding: 0 25px;
        box-sizing: border-box;
        transition: width 0.5s cubic-bezier(0.165, 0.84, 0.44, 1),
          height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

        &.focus-div {
          width: 400px;
          height: 250px;

          .beatmap {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

            .preview-image .shadow {
              overflow: hidden;
              opacity: 0.3;
            }
            .recommand-warpper {
              opacity: 1;
            }
            .detail-warpper {
              transition-delay: 0.1s;
              opacity: 1;
              > .title {
                font-size: 2rem;
              }
              > .artist {
                font-size: 1.2rem;
              }
            }
          }
        }

        .beatmap {
          height: 100%;
          width: 100%;
          position: relative;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0);
          border-radius: 15px;
          overflow: hidden;

          .overflow-clip {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .recommand-warpper {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 5px;
            color: #ffffff;
            opacity: 0;
            transition: opacity 0.2s linear;

            > .title {
              font-weight: 500;
              font-size: 1rem;

              &::before {
                content: "#";
                margin-right: 5px;
              }
            }
            > .text {
              font-size: 1.2rem;
            }
          }

          .preview-image {
            height: 100%;
            background-size: cover;
            background-position: center;
            .shadow {
              height: 100%;
              background: #000;
              opacity: 0.4;
              transition: opacity 0.5s linear;
            }
          }

          .detail-warpper {
            transition: opacity 0.2s linear;
            opacity: 0.8;
            color: white;
            position: absolute;
            bottom: 10px;
            left: 10px;
            right: 10px;

            > .title {
              font-weight: 500;
              font-size: 1.2rem;
            }
            > .artist {
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
}
</style>