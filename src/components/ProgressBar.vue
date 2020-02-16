<template>
  <div class="progress-bar" v-bind:style="{'background-color':backgroundColor,'height':height}">
    <div class="bar" v-bind:style="{'width':progress,'background-color':color}"></div>
  </div>
</template>

<script>
export default {
  name: "progress-bar",
  props: ["progress", "width", "backgroundColor", "color", "height"]
};
</script>

<style lang="scss">
.progress-bar {
  width: 100%;
  .bar {
    height: 100%;
    opacity: 0.5;
  }
}
</style>