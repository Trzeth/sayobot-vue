<template>
  <div class="preview-card" v-on:mouseenter="isHover = true" v-on:mouseleave="isHover = false">
    <header class="header">
      <div class="title-artist-warpper">
        <h2 class="title" v-bind:title="title">{{title}}</h2>
        <h3 class="artist" v-bind:title="artist">{{artist}}</h3>
      </div>

      <div class="download-btn-warpper" v-on:click.stop>
        <a class="iconfont icon-download download-btn" v-bind:href="downloadLink"></a>
      </div>
    </header>

    <div class="banner">
      <img v-bind:src="previewCardBackgroundSrc" />
    </div>
    <footer class="footer">
      <span class="status badge">{{approvedStatus}}</span>
      <span class="favourite_count">{{beatmapsetInfo.favourite_count}}</span>
      <span class="play_count">{{beatmapsetInfo.order}}</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "preview-card",
  data: function() {
    return {
      isHover: false
    };
  },
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        font-size: 1.3rem;
        font-weight: 500;
      }
      .artist {
        font-size: 1rem;
        font-weight: 400;
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
    order: 3;
    display: flex;

    > span {
      display: block;
      transform: translateY(-50%);
      opacity: 0;
      transition: all 0.5s ease;
    }
    :nth-child(1) {
    }

    :nth-child(2) {
      transition-delay: 0.1s;
    }

    :nth-child(3) {
      transition-delay: 0.2s;
    }
  }

  &:hover .footer {
    > span {
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