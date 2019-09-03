<template>
  <div class="detail-card" v-on:click.stop>
    <img class="head-img" v-bind:src="detailCardBackgroundSrc" />

    <div class="down">
      <div class="left">
        <h2 class="title">{{beatmapsetDetail.title}}</h2>
        <h2 class="artist">{{beatmapsetDetail.artist}}</h2>
        <h2 class="creator">{{beatmapsetDetail.creator}}</h2>
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
            <div class="background">{{beatmap.version}}</div>
          </li>
        </ul>
        <span>Download BTN</span>
        <div>
          <span>L: {{currentBeatmapDetail.length}}</span>
          <span>BPM: {{beatmapsetDetail.bpm}}</span>
          <span>Cir: {{currentBeatmapDetail.circles}}</span>
          <span>Sli: {{currentBeatmapDetail.sliders}}</span>
          <span>Spin: {{currentBeatmapDetail.spinners}}</span>
        </div>
        <div>{{currentBeatmapDetail.CS}}</div>
        <div>{{currentBeatmapDetail.OD}}</div>
        <div>{{currentBeatmapDetail.AR}}</div>
        <div>{{currentBeatmapDetail.HP}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import ModeSelector from "./ModeSelector";
export default {
  name: "detail-card",
  data: function() {
    return {
      currentBeatmapIndex: 0,
      beatmapsetDetail: null
    };
  },
  components: {
    ModeSelector
  },
  props: ["optine"],
  created: function() {
    axios
      .get("https://api.sayobot.cn/v2/beatmapinfo" + "?0=" + this.optine.sid)
      .then(response => {
        this.beatmapsetDetail = response.data.data;
      });
  },
  computed: {
    detailCardBackgroundSrc: function() {
      var src = "https://cdn.sayobot.cn:25225/beatmaps/${sid}/covers/cover.jpg";
      return src.replace("${sid}", this.optine.sid);
    },
    currentBeatmapDetail: function() {
      return this.beatmapsetDetail.bid_data[this.currentBeatmapIndex];
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
    justify-content: space-between;

    .left {
      padding: 100px 0 0 10px;
      max-width: 50%;

      .title {
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
      max-width: 50%;
      text-align: right;

      ul {
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
    }
  }
}
</style>