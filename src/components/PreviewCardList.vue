<template>
  <div class="preview-card-list-warpper">
    <div class="preview-card-list">
      <preview-card
        v-for="(beatmapset) in beatmapsetList"
        v-bind:key="beatmapset.sid"
        v-bind:beatmapsetInfo="beatmapset"
        v-bind:isUnicode="isUnicode"
      ></preview-card>
    </div>
  </div>
</template>

<script>
import PreviewCard from "./PreviewCard";

export default {
  name: "preview-card-list",
  components: {
    PreviewCard
  },
  localStorage: {
    isUnicode: {
      type: Boolean,
      default: false
    }
  },
  props: ["beatmapsetList"]
};
</script>
<style lang="scss">
.preview-card-list-warpper {
  .preview-card-list {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>