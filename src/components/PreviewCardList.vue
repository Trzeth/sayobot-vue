<template>
  <div class="preview-card-list">
    <preview-card
      v-for="(beatmapset,index) in beatmapsetList"
      v-bind:key="index"
      v-bind:beatmapsetInfo="beatmapset"
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
  props: ["beatmapsetList"]
};
</script>
<style>
.preview-card-list {
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>