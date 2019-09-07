<template>
  <div class="detail-card" v-on:click.stop>
    <div ref="scroll" class="scroll">
      <div>
        <img class="head-img" v-bind:src="detailCardBackgroundSrc" />

        <div class="down">
          <div class="left">
            <span
              class="play-btn iconfont icon-caret-right"
              v-bind:class="{'inited':isWsInited,'playing':isWsPlaying}"
              @click="play"
            ></span>
            <span
              class="pause-btn iconfont icon-pause"
              v-bind:class="{'inited':isWsInited,'playing':isWsPlaying}"
              @click="pause"
            ></span>
            <range-slider
              class="slider"
              v-bind:class="{'inited':isWsInited}"
              min="0"
              max="1"
              step="0.01"
              v-model="wsVolume"
            ></range-slider>
            <div ref="waveform" class="waveform"></div>

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
                <div class="background">{{star(beatmap.star)}}*</div>
              </li>
            </ul>
            <div class="beatmapset-detail">
              <span class="iconfont icon-time-circle" title="Length">{{length}}</span>
              <span class="iconfont icon-bell" title="BPM">{{beatmapsetDetail.bpm}}</span>
              <span
                class="iconfont icon-circle circle"
                title="Circles"
              >{{currentBeatmapDetail.circles}}</span>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import WaveSurfer from "wavesurfer.js";
import ProgressBar from "./ProgressBar";
import RangeSlider from "vue-range-slider";
import "vue-range-slider/dist/vue-range-slider.css";

/* Better Scroll Bar */
import BScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";

BScroll.use(MouseWheel);

export default {
  name: "detail-card",
  data: function() {
    return {
      currentBeatmapIndex: 0,
      beatmapsetDetail: {
        //去除 error
        bid_data: [{}]
      },
      isWsInited: false,
      isWsPlaying: false,
      wsVolume: 1
    };
  },
  localStorage: {
    isUnicode: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ProgressBar,
    RangeSlider
  },
  props: ["optine", "isOpen"],
  mounted: function() {
    this.init();
  },
  watch: {
    wsVolume: function(newValue) {
      this.ws.setVolume(newValue);
    },
    currentBeatmapIndex: function() {
      this.$router.replace({
        query: {
          sid: this.beatmapsetDetail.sid,
          bid: this.currentBeatmapDetail.bid
        }
      });
    },
    isOpen: {
      handler: function() {
        this.isWsInited = false;
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
      this.bs = new BScroll(this.$refs.scroll, {
        scrollY: true,
        click: true,
        probeType: 3,
        mouseWheel: {
          speed: 0,
          invert: false,
          easeTime: 300
        }
      });
    },
    intiWaveSurfer() {
      var src = "https://cdn.sayobot.cn:25225/preview/${sid}.mp3";
      src = "/audio/${sid}.mp3";
      src = src.replace("${sid}", this.beatmapsetDetail.sid);
      this.ws.load(src);
      this.ws.on("play", () => {
        this.isWsPlaying = true;
      });
      this.ws.on("pause", () => {
        this.isWsPlaying = false;
      });
      this.ws.on("ready", () => {
        this.ws.play();
      });
    },
    play() {
      if (!this.isWsInited) {
        this.intiWaveSurfer();
        this.isWsInited = true;
        this.isWsPlaying = true;
      } else {
        this.ws.play();
      }
    },
    pause() {
      this.ws.pause();
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
    },
    star: function(num) {
      return parseFloat(num).toFixed(2);
    }
  }
};
</script>

<style lang="scss">
.detail-card {
  box-sizing: border-box;
  max-width: 50%;
  overflow: hidden;
  margin: 20px;
  border-radius: 25px;
  background: #ffffff;
  max-height: 100%;

  .scroll {
    position: relative;
    max-height: 100%;
  }
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
      position: relative;

      .play-btn {
        cursor: pointer;
        margin: 10px;
        font-size: 5rem;
        position: absolute;
        z-index: 1;
        &.inited {
          margin: 0;
          font-size: 2rem;
        }
        &.playing {
          visibility: hidden;
        }
      }

      .play-btn ~ .waveform {
        visibility: collapse;
      }
      .play-btn.inited ~ .waveform {
        visibility: visible;
      }

      .pause-btn {
        cursor: pointer;
        margin: 10px;
        font-size: 5rem;
        position: absolute;
        visibility: hidden;
        transition: font-size 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        &.inited {
          margin: 0;
          font-size: 2rem;
        }

        &.playing {
          visibility: visible;
        }
      }

      .slider {
        position: absolute;
        right: 0;
        visibility: hidden;

        &.inited {
          visibility: visible;
        }
      }

      .waveform {
        top: 2rem;
        position: relative;
        z-index: 0;
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
          cursor: pointer;
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
        .value {
          min-width: 33px;
          text-align: center;
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