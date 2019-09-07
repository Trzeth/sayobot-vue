<template>
  <div class="preview-card">
    <header class="header">
      <div class="title-artist-warpper">
        <h2 class="title overflow-clip" v-bind:title="title">
          <router-link v-bind:to="beatmapsetInfoLink">{{title}}</router-link>
        </h2>
        <h3 class="artist overflow-clip" v-bind:title="artist">
          <router-link v-bind:to="searchArtistLink">{{artist}}</router-link>
        </h3>
      </div>

      <div class="download-btn-warpper" v-on:click.stop>
        <a class="iconfont icon-download download-btn" v-bind:href="downloadLink"></a>
      </div>
    </header>

    <div class="banner">
      <router-link v-bind:to="beatmapsetInfoLink">
        <img v-bind:src="previewCardBackgroundSrc" />
      </router-link>
    </div>
    <footer class="footer">
      <router-link v-bind:to="searchCreatorLink" class="overflow-clip">@{{beatmapsetInfo.creator}}</router-link>
      <span class="iconfont icon-heart-fill">{{beatmapsetInfo.favourite_count}}</span>
      <span class="iconfont icon-play-circle-fill">{{beatmapsetInfo.order}}</span>

      <!-- <span class="status badge">{{approvedStatus}}</span>-->
    </footer>
  </div>
</template>

<script>
export default {
  name: "preview-card",
  props: {
    beatmapsetInfo: Object,
    isUnicode: Boolean
  },
  methods: {
    click() {
      this.$router.push({
        path: "beatmapset",
        query: { sid: this.beatmapsetInfo.sid }
      });
    }
  },
  computed: {
    beatmapsetInfoLink: function() {
      return "beatmapset?sid=" + this.beatmapsetInfo.sid;
    },
    searchArtistLink: function() {
      return "search?keyword=" + this.beatmapsetInfo.artist;
    },
    searchCreatorLink: function() {
      return "search?keyword=" + this.beatmapsetInfo.creator;
    },
    title: function() {
      if (this.isUnicode == true && this.beatmapsetInfo.titleU != "") {
        return this.beatmapsetInfo.titleU;
      } else {
        return this.beatmapsetInfo.title;
      }
    },
    artist: function() {
      if (this.isUnicode == true && this.beatmapsetInfo.artistU != "") {
        return this.beatmapsetInfo.artistU;
      } else {
        return this.beatmapsetInfo.artist;
      }
    },
    downloadLink: function() {
      return "https://txy1.sayobot.cn/download/osz/" + this.beatmapsetInfo.sid;
    },
    previewCardBackgroundSrc: function() {
      var src = "https://cdn.sayobot.cn:25225/beatmaps/${sid}/covers/cover.jpg";
      return src.replace("${sid}", this.beatmapsetInfo.sid);
    },
    approvedStatus: function() {
      var status;
      switch (this.beatmapsetInfo.approved) {
        case 0:
          status = "Pending";
          break;
        case 1:
          status = "Ranked";
          break;
        case 2:
          status = "Approved";
          break;
        case 3:
          status = "Qualified";
          break;
        case 4:
          status = "Loved";
          break;
        case -1:
          status = "WIP";
          break;
        case -2:
          status = "Graveyard";
          break;
      }
      return status;
    }
  }
};
</script>

<style lang="scss">
.preview-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .overflow-clip {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: -1rem;
    left: 0;
    right: 0;
    border-radius: 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    z-index: -1;
    transition: all 0.3s ease;
  }
  &:hover::after {
    bottom: -2rem;
  }

  .header {
    order: 2;
    display: flex;
    align-items: center;
    .title-artist-warpper {
      flex: 1;
      overflow: hidden;
      margin: 5px 0 0 5px;

      .title {
        width: 95%;
        font-size: 1.3rem;
        font-weight: 500;
      }
      .artist {
        width: 95%;
        color: #262626;
        font-size: 1rem;
        font-weight: 400;
        margin-left: -1ch;
        transition: margin 0.3s ease;
        &::before {
          content: "#";
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        &:hover {
          margin-left: 0;
          &::before {
            opacity: 1;
          }
        }
      }
    }

    .download-btn-warpper {
      .download-btn {
        font-size: 2rem;
        color: black;
      }
    }
  }

  .banner {
    order: 1;
    position: relative;
    padding-top: 28%;
    height: 0;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    img {
      position: absolute;
      width: 100%;
      height: auto;
      top: 0;
    }
  }

  .footer {
    position: absolute;
    bottom: -1.5rem;
    left: 5px;
    right: 5px;
    order: 3;
    display: flex;

    > a,
    span {
      display: block;
      transform: translateY(-50%);
      opacity: 0;
      transition: all 0.5s ease;
      margin-right: 10px;
      border-radius: 5px;
    }
    :nth-child(1) {
      cursor: pointer;
      color: #d26;
    }

    :nth-child(2) {
      color: #666;
      transition-delay: 0.1s;
    }

    :nth-child(3) {
      color: #666;

      transition-delay: 0.2s;
    }
  }

  &:hover .footer {
    > a,
    span {
      opacity: 1;

      transform: translateY(0);
    }
  }
}

@media screen and (max-width: 480px) {
  .preview-card {
    width: 80%;
  }
}
</style>