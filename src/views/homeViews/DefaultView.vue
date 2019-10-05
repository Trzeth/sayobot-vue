<template>
  <div>
    <div class="side-bar-warpper">
      <div class="upper">
        <div class="links">
          <a class="link active">推荐</a>
          <a class="link">排行榜</a>
          <a class="link">图包</a>
          <a class="link">艺人</a>
          <a class="link">曲风流派</a>
          <a class="link">专辑</a>
          <a class="link">支持小夜</a>
          <a class="link">下载客户端</a>
        </div>
      </div>
      <div class="lower">
        <div class="player-warpper">
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
      </div>
    </div>

    <div id="main">
      <div class="recommend-bar-warpper warpper">
        <h2 class="title">最新单曲</h2>

        <recommend-bar></recommend-bar>
      </div>
      <div class="package-list-warpper warpper">
        <h2 class="title">热门图包</h2>
        <package-list></package-list>
      </div>

      <div class="artist-bar-warpper warpper">
        <h2 class="title">热门艺人</h2>
        <artist-bar></artist-bar>
      </div>

      <!-- <div class="genre-bar-warpper warpper">
        <h2 class="title">曲风流派</h2>
        <genre-bar></genre-bar>
      </div>-->
    </div>
  </div>
</template>

<script>
import RecommendBar from "@/components/RecommendBar";
import PackageList from "@/components/PackageList";
import ArtistBar from "@/components/ArtistBar";
import GenreBar from "@/components/GenreBar";

import RangeSlider from "vue-range-slider";
import "vue-range-slider/dist/vue-range-slider.css";

export default {
  name: "default-view",
  components: {
    RecommendBar,
    PackageList,
    RangeSlider,
    ArtistBar,
    GenreBar
  }
};
</script>

<style lang="scss">
$navHeight: 72px;

$sideBarLeft: 100px;
$sideBarWidth: 250px;

.side-bar-warpper {
  position: fixed;
  left: $sideBarLeft;
  top: $navHeight + 50px;
  box-sizing: border-box;
  width: $sideBarWidth;
  bottom: 0px;
  z-index: 1;

  .upper {
    background: #ffffff;

    .links {
      padding: 10px 30px 10px 25px;
      .link {
        display: block;
        margin: 15px 0;
        font-size: 1.2rem;
        font-weight: 300;

        &.active {
          font-weight: 500;
          color: #f759ab;
          &::after {
            content: "";
            display: block;
            margin-top: 4px;
            border-top: #f759ab 3px solid;
          }
        }
      }
    }
  }

  .lower {
    position: absolute;
    bottom: 50px;
    .player-warpper {
      .control-bar {
        overflow: hidden;
        .iconfont {
          font-size: 1.5rem;
        }
        .left {
          float: left;
        }
        .right {
          float: right;
        }
      }
      .slider-warpper {
        .iconfont {
          font-size: 1.5rem;
        }
      }
    }
  }
}
#main {
  padding-top: $navHeight;
  .warpper {
    padding-left: $sideBarLeft + $sideBarWidth;

    > .title {
      font-weight: 500;
      margin-bottom: 25px;
      margin-left: 50px;
      font-size: 1.8rem;
    }
  }
  .recommend-bar-warpper {
    padding-top: 20px;
    padding-bottom: 20px;
    background: #f5f5f5;
    margin-top: 20px;
  }
  .package-list-warpper {
    margin-top: 50px;
  }
  .artist-bar-warpper {
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
</style>