<template>
  <div>
    <div class="side-bar">
      <div class="upper">
        <div class="links">
          <router-link class="link active" to="/">推荐</router-link>
          <router-link class="link" to="/board">排行榜</router-link>
          <router-link class="link" to="/list/package">图包</router-link>
          <router-link class="link" to="/list/artist">艺人</router-link>
          <router-link class="link" to="/genre">曲风流派</router-link>
          <!-- <router-link class="link" to="/">专辑</router-link> -->
          <router-link class="link" to="/support">支持小夜</router-link>
          <router-link class="link" to="/download">下载客户端</router-link>
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

export default {
  name: "default-view",
  components: {
    RecommendBar,
    PackageList,
    ArtistBar,
    GenreBar
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/view.scss";

$sideBarLeft: 100px;
$sideBarWidth: 250px;

.side-bar {
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