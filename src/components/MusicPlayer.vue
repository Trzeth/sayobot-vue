<template>
  <div class="music-player">
    <h2>Now Playing</h2>
    <div class="player">
      <span>Black Night Town (TV Size)</span>
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
  }
};
</script>

<style lang="scss">
</style>