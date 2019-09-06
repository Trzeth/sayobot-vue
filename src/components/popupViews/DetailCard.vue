<template>
  <div class="detail-card" v-on:click.stop>
    <img class="head-img" v-bind:src="detailCardBackgroundSrc" />

    <div class="down">
      <div class="left">
        <span
          class="play-btn iconfont icon-caret-right"
          v-bind:class="{'clicked':isWsClicked}"
          @click="play"
        ></span>
        <div ref="waveform"></div>
        <h2 class="title">{{title}}</h2>
        <h2 class="artist" @click="artistClick">{{artist}}</h2>
        <h2 class="creator" @click="creatorClick">{{beatmapsetDetail.creator}}</h2>
        <div class="timeline">
          <h3>Last Update: {{beatmapsetDetail.last_update}}</h3>
          <h3>Approved:{{beatmapsetDetail.approved_date}}</h3>
        </div>
      </div>
      <div class="right">
        <!--<mode-selector v-bind:beatmaps="beatmapsetDetail.bid_data"></mode-selector>
        -->
        <ul>
          <li
            v-for="(beatmap,index) in beatmapsetDetail.bid_data"
            @click="currentBeatmapIndex = index"
            v-bind:key="beatmap.bid"
            class="mode-li"
          >
            <div class="background">{{beatmap.star}}*</div>
          </li>
        </ul>
        <div class="beatmapset-detail">
          <span class="iconfont icon-time-circle" title="Length">{{length}}</span>
          <span class="iconfont icon-bell" title="BPM">{{beatmapsetDetail.bpm}}</span>
          <span class="iconfont icon-circle circle" title="Circles">{{currentBeatmapDetail.circles}}</span>
          <span class="iconfont icon-sliders" title="Sliders">{{currentBeatmapDetail.sliders}}</span>
          <span
            class="iconfont icon-spinner3 circle"
            title="Spinners"
          >{{currentBeatmapDetail.spinners}}</span>
        </div>
        <table class="beatmap-detail-table">
          <tbody>
            <tr>
              <th class="title">Circle Size</th>
              <td class="progress">
                <progress-bar
                  background-color="black"
                  height="5px"
                  color="white"
                  v-bind:progress="valueToPectange(currentBeatmapDetail.CS)"
                ></progress-bar>
              </td>
              <td class="value">{{currentBeatmapDetail.CS}}</td>
            </tr>
            <tr>
              <th class="title">Overall Difficulty</th>
              <td class="progress">
                <progress-bar
                  background-color="black"
                  height="5px"
                  color="white"
                  v-bind:progress="valueToPectange(currentBeatmapDetail.OD)"
                ></progress-bar>
              </td>
              <td class="value">{{currentBeatmapDetail.OD}}</td>
            </tr>
            <tr>
              <th class="title">HP Drain</th>
              <td class="progress">
                <progress-bar
                  background-color="black"
                  height="5px"
                  color="white"
                  v-bind:progress="valueToPectange(currentBeatmapDetail.HP)"
                ></progress-bar>
              </td>
              <td class="value">{{currentBeatmapDetail.HP}}</td>
            </tr>
            <tr>
              <th class="title">Approach Rate</th>
              <td class="progress">
                <progress-bar
                  background-color="black"
                  height="5px"
                  color="white"
                  v-bind:progress="valueToPectange(currentBeatmapDetail.AR)"
                ></progress-bar>
              </td>
              <td class="value">{{currentBeatmapDetail.AR}}</td>
            </tr>
            <tr v-if="beatmapsetDetail.aim != 0">
              <th class="title">Aim</th>
              <td class="progress">
                <progress-bar
                  background-color="black"
                  height="5px"
                  color="white"
                  v-bind:progress="valueToPectange(currentBeatmapDetail.aim)"
                ></progress-bar>
              </td>
              <td class="value">{{currentBeatmapDetail.aim}}</td>
            </tr>
            <tr v-if="beatmapsetDetail.speed !== 0">
              <th class="title">Speed</th>
              <td class="progress">
                <progress-bar
                  background-color="black"
                  height="5px"
                  color="white"
                  v-bind:progress="valueToPectange(currentBeatmapDetail.speed)"
                ></progress-bar>
              </td>
              <td class="value">{{currentBeatmapDetail.speed}}</td>
            </tr>
          </tbody>
        </table>
        <div></div>
      </div>
    </div>

    <a class="download-btn iconfont icon-vertical-align-botto" v-bind:href="downloadLink"></a>
  </div>
</template>

<script>
import axios from "axios";
import WaveSurfer from "wavesurfer.js";
import ModeSelector from "./ModeSelector";
import ProgressBar from "./ProgressBar";

export default {
  name: "detail-card",
  data: function() {
    return {
      currentBeatmapIndex: 0,
      beatmapsetDetail: {
        //去除 error
        bid_data: [{}]
      },
      isWsClicked: false
    };
  },
  localStorage: {
    isUnicode: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ModeSelector,
    ProgressBar
  },
  props: ["optine", "isOpen"],
  mounted: function() {
    this.init();
  },
  watch: {
    currentBeatmapIndex: {
      immediate: true,
      handler: function() {
        this.$router.replace({
          query: {
            sid: this.beatmapsetDetail.sid,
            bid: this.currentBeatmapDetail.bid
          }
        });
      }
    },
    isOpen: {
      immediate: true,
      handler: function() {
        this.isWsClicked = false;
        this.ws.empty();
      }
    },
    optine: {
      immediate: true,
      handler: function() {
        axios
          .get(
            "https://api.sayobot.cn/v2/beatmapinfo" + "?0=" + this.optine.sid
          )
          .then(response => {
            this.beatmapsetDetail = response.data.data;
          });
      }
    }
  },
  computed: {
    length: function() {
      var second = 0,
        minute = 0;
      var length = this.currentBeatmapDetail.length;
      second = length % 60;
      minute = (length - second) / 60;
      return minute + ":" + second;
    },
    title: function() {
      if (this.isUnicode == true && this.beatmapsetDetail.titleU != "") {
        return this.beatmapsetDetail.titleU;
      } else {
        return this.beatmapsetDetail.title;
      }
    },
    artist: function() {
      if (this.isUnicode == true && this.beatmapsetDetail.artistU != "") {
        return this.beatmapsetDetail.artistU;
      } else {
        return this.beatmapsetDetail.artist;
      }
    },
    downloadLink: function() {
      return (
        "https://txy1.sayobot.cn/download/osz/" + this.beatmapsetDetail.sid
      );
    },
    detailCardBackgroundSrc: function() {
      var src = "https://cdn.sayobot.cn:25225/beatmaps/${sid}/covers/cover.jpg";
      return src.replace("${sid}", this.optine.sid);
    },
    currentBeatmapDetail: function() {
      return this.beatmapsetDetail.bid_data[this.currentBeatmapIndex];
    }
  },
  methods: {
    valueToPectange(value) {
      return value * 10 + "%";
    },
    init() {
      this.ws = WaveSurfer.create({
        container: this.$refs.waveform,
        height: 128,
        barWidth: 2,
        barHeight: 1,
        barGap: null
      });
    },
    play() {
      if (!this.isWsClicked) {
        var src = "https://cdn.sayobot.cn:25225/preview/${sid}.mp3";
        src = src.replace("${sid}", this.beatmapsetDetail.sid);
        this.isWsClicked = true;
        this.ws.load(src);
      } else {
        this.ws.playPause();
      }
    },
    artistClick() {
      this.$router.push({
        path: "search",
        query: {
          keyword: this.beatmapsetDetail.artist
        }
      });
    },
    creatorClick() {
      this.$router.push({
        path: "search",
        query: {
          keyword: this.beatmapsetDetail.creator
        }
      });
    }
  }
};
</script>

<style lang="scss">
.detail-card {
  width: 50%;
  overflow: hidden;
  margin: 20px;
  border-radius: 25px;
  background: #ffffff;

  .head-img {
    position: relative;
    left: 0;
    right: 0;
    text-align: center;
    min-width: 100%;
    height: 200px;
  }

  .down {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .left {
      flex: 1;
      padding: 10px 0 0 10px;
      .play-btn {
        cursor: pointer;
        display: inline-block;
        margin: 10px;
        font-size: 5rem;
        position: absolute;
        z-index: 1;
        transition: font-size 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        &.clicked {
          font-size: 2rem;
        }
      }
      .title {
        margin-top: 40px;

        font-weight: 400;
        font-size: 2rem;
      }
      .artist {
        font-weight: 400;
        font-size: 1.5rem;
      }
      .creator {
        font-weight: 500;
        font-size: 1.2rem;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 300px;
      text-align: right;

      .beatmapset-detail {
        .iconfont {
          display: inline-block;
          margin: 0 5px;

          &.circle:before {
            font-size: 1rem;
          }
          &:before {
            margin-right: 4px;
            font-size: 1.2rem;
          }
        }
      }

      ul {
        flex: 1;
        list-style-type: none;
        padding: 0;

        .mode-li {
          margin: 0 5px;
          padding: 5px 10px;
          border-radius: 20px;
          display: inline-block;
          text-align: center;
          color: #ffffff;
          background: #f563a4;
        }
      }

      .beatmap-detail-table {
        .title {
          white-space: nowrap;
        }
        .progress {
          padding: 5px;
          width: 100%;
        }
      }
    }
  }
  .download-btn {
    text-decoration: none;
    display: block;
    cursor: pointer;
    color: #bfbfbf;
    font-size: 5rem;
    text-align: center;
    transition: color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      color: #000000;
    }
  }
}
</style>