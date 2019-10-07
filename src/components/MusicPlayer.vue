<template>
  <div class="music-player">
    <h2 class="title">Now Playing</h2>
    <div class="player">
      <span class="song-name">{{title}}</span>
      <div class="control-bar">
        <div class="left">
          <span class="iconfont icon-step-backward"></span>
          <span class="iconfont icon-caret-right"></span>
          <span class="iconfont icon-step-forward"></span>
        </div>
        <div class="right">
          <span class="iconfont icon-heart"></span>
          <span class="iconfont icon-download"></span>
        </div>
      </div>
      <div class="slider-warpper">
        <span class="iconfont icon-shengyin"></span>
        <span class="iconfont icon-speaker-mute" style="display:none"></span>
        <range-slider class="slider" min="0" max="1" step="0.01" v-model="volume"></range-slider>
      </div>

      <audio ref="preview" preload="none">
        <source v-bind:src="previewAudioSrc" type="audio/mp3" />
      </audio>
    </div>
  </div>
</template>

<script>
import RangeSlider from "vue-range-slider";
import "vue-range-slider/dist/vue-range-slider.css";

export default {
  name: "music-player",
  components: {
    RangeSlider
  },
  data: function() {
    return {
      volume: 1
    };
  },
  watch: {
    "this.playList": {
      immediate: true,
      deep: true,
      handler: function() {}
    }
  },
  methods: {
    playPreviewAudio: function() {
      var preview = this.$refs.preview;
      if (this.isPreviewAudioPlaying) {
        this.isPreviewAudioPlaying = false;
        preview.pause();
      } else {
        this.isPreviewAudioPlaying = true;
        preview.play();
      }
    }
  },
  computed: {
    previewAudioSrc: function() {
      if (this.playList.length == 0 || this.playList.length < this.currentPos)
        return;
      var src = "https://txy1.sayobot.cn/audio/${sid}.mp3";
      src = src.replace("${sid}", this.currentMusicInfo.sid);
      return src;
    },
    title: function() {
      return this.currentMusicInfo.title;
    },
    artist: function() {
      return this.currentMusicInfo.artist;
    },
    currentMusicInfo: function() {
      if (!this.playList) return;
      return this.playList[this.currentPos];
    },
    playList: function() {
      return this.$store.state.playList;
    },
    currentPos: function() {
      return this.$store.state.currentPos;
    }
  },
  watch: {
    playList: {
      immediate: true,
      deep: true,
      handler: function() {
        console.log(this.playList);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/view.scss";

.music-player {
  background: #ffffff;
  width: $sidebarWidth;
  > .title {
    color: #f8f8f8;
    font-size: 2rem;
    font-weight: 400;
  }
  .player {
    .song-name {
      font-size: 1rem;
      font-weight: 400;
    }
    .control-bar {
      display: flex;
      justify-content: space-between;
    }
    .slider-warpper {
      display: flex;
      .slider {
        flex: 1;
      }
    }
  }
}
</style>