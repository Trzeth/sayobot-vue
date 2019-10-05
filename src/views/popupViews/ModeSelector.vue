<template>
  <div class="mode-selector">
    <div class="osu">
      <img
        class="icon"
        v-for="(beatmap,index) in beatmaps"
        v-bind:key="index"
        src="@/assets/img/mode-osu-small@2x.png"
      />
    </div>
    <div class="taiko"></div>
    <div class="catch"></div>
    <div class="mania"></div>
  </div>
</template>

<script>
export default {
  name: "mode-selector",
  props: ["beatmaps"],
  data: function() {
    return {
      mode: null
    };
  },
  methods: {
    modeIconSrc: function(beatmap) {
      switch (beatmap.mode) {
        case 0:
          //osu
          return "@/img/mode-osu-small@2x.png";
        case 1:
          //taiko
          return "@/img/mode-taiko-small@2x.png";
        case 2:
          //catch
          return "@/img/mode-fruits-small@2x.png";
        case 3:
          //mania
          return "@/img/mode-mania-small@2x.png";
      }
    },
    modeIconClass: function(beatmap) {
      switch (beatmap.mode) {
        case 0:
          //osu
          return "../../assets/img/mode-osu-small@2x.png";
        case 1:
          //taiko
          return "../../assets/img/mode-taiko-small@2x.png";
        case 2:
          //catch
          return "../../assets/img/mode-fruits-small@2x.png";
        case 3:
          //mania
          return "../../assets/img/mode-mania-small@2x.png";
      }
    }
  }
};
</script>

<style lang="scss">
.mode-selector {
  .icon {
    display: inline-block;
    border-radius: 15px;
    width: 48px;
    height: 48px;

    padding: 8px;
  }

  .osu {
    img {
      background: #f563a4;
    }
  }
  .taiko {
    background: #fbed00;
  }
  .catch {
    background: #00ff00;
  }
  .mania {
    background: #b2b2b2;
  }
}
</style>