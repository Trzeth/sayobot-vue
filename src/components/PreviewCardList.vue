<template>
  <div class="preview-card-list">
    <preview-card
      v-for="(beatmapset) in beatmapsetList"
      v-bind:key="beatmapset.sid"
      v-bind:beatmapsetInfo="beatmapset"
      v-bind:isUnicode="isUnicode"
    ></preview-card>
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
.preview-card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  align-items: start;
  grid-gap: 3rem 3rem;
}
</style>