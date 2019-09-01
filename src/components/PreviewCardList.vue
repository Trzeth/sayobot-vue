<template>
  <div class="preview-card-list-warpper">
    <detail-card v-bind:isOpen.sync="isOpen"></detail-card>
    <div class="preview-card-list">
      <preview-card
        v-for="(beatmapset,index) in beatmapsetList"
        v-bind:key="index"
        v-on:click.native="click(beatmapset)"
        v-bind:beatmapsetInfo="beatmapset"
      ></preview-card>
    </div>
  </div>
</template>

<script>
import PreviewCard from "./PreviewCard";
import DetailCard from "./DetailCard";

export default {
  name: "preview-card-list",
  components: {
    PreviewCard,
    DetailCard
  },
  data: function() {
    return {
      isOpen: false
    };
  },
  props: ["beatmapsetList"],
  methods: {
    click(beatmapset) {
      console.log(beatmapset);
      this.isOpen = true;
    }
  }
};
</script>
<style lang="scss">
.preview-card-list-warpper {
  .preview-card-list {
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>