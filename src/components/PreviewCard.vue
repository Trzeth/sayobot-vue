<template>
  <div class="preview-card" v-on:mouseenter="isHover = true" v-on:mouseleave="isHover = false">
    <div class="preview-card-upper">
      <img v-bind:src="previewCardBackgroundSrc" />

      <span class="status badge">{{approvedStatus}}</span>
      <div class="count">
        <span class="favourite_count">{{beatmapsetInfo.favourite_count}}</span>
        <br />
        <span class="play_count">{{beatmapsetInfo.order}}</span>
      </div>
    </div>
    <div class="preview-card-down">
      <div class="info-warpper">
        <div class="base-info">
          <h2 class="hidden-overflow" v-bind:title="beatmapsetInfo.title">{{beatmapsetInfo.title}}</h2>
          <h3 class="hidden-overflow">{{beatmapsetInfo.artist}}</h3>

          <div class="detail" v-show="isHover">
            <h3>Creator: {{beatmapsetInfo.creator}}</h3>
          </div>
        </div>
        <div class="download-btn-warpper">
          <a class="iconfont icon-download download-btn" v-bind:href="downloadLink"></a>
        </div>
      </div>
    </div>
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
  props: ["beatmapsetInfo"],
  computed: {
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
  width: 20%;
  margin: 10px 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;

  .preview-card-upper {
    position: relative;

    img {
      display: block;
      width: 100%;
      height: 84px;
    }
    .badge {
      padding: 3px 10px;
      font-size: 0.8rem;
      letter-spacing: 1px;
      font-weight: 500;
      border-radius: 25px;
      background: rgba(0, 0, 0, 0.5);
      color: #ffffff;
    }
    .status {
      position: absolute;
      left: 5px;
      top: 5px;
    }
    .count {
      position: absolute;
      right: 5px;
      top: 5px;
      text-align: right;
      .favourite_count {
        color: white;
      }
      .play_count {
        color: white;
      }
    }
  }
  .preview-card-down {
    padding: 5px 10px;

    .info-warpper {
      position: relative;

      .base-info {
        flex: 2;

        .hidden-overflow {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        h2 {
          font-size: 1.3rem;
          font-weight: 500;
        }
        h3 {
          font-size: 1rem;
          font-weight: 400;
        }
      }
      .download-btn-warpper {
        display: flex;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        align-items: center;
        background: #ffffff;
        cursor: pointer;

        .download-btn {
          color: #000;
          text-decoration: none;
          font-size: 2rem;
        }
        .download-btn:visited {
          color: #000;
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .preview-card {
    width: 80%;
  }
}
</style>