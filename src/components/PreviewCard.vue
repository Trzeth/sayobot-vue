<template>
  <div class="preview-card">
    <div class="preview-card-upper">
      <img v-bind:src="previewCardBackgroundSrc" />

      <span class="status">{{approvedStatus}}</span>
      <div class="count">
        <span class="favourite_count">{{beatmapsetInfo.favourite_count}}</span>
        <br />
        <span class="play_count">{{beatmapsetInfo.order}}</span>
      </div>
    </div>
    <h2 v-bind:title="beatmapsetInfo.title">{{beatmapsetInfo.title}}</h2>
    <div v-show="false">
      <h3>Artist: {{beatmapsetInfo.artist}}</h3>
      <h3>Creator: {{beatmapsetInfo.creator}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "preview-card",
  props: ["beatmapsetInfo"],
  computed: {
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
  box-shadow: 0 0 3px #000;

  h2 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .preview-card-upper {
    position: relative;

    img {
      display: block;
      width: 100%;
      height: auto;
    }
    .status {
      position: absolute;
      left: 0;
      top: 0;
    }
    .count {
      position: absolute;
      right: 0;
      top: 0;
      text-align: right;
      .favourite_count {
      }
      .play_count {
      }
    }
  }
}
</style>