<template>
  <div class="popup-view" v-bind:class="{'popup-open':isOpen}">
    <div class="cover" v-on:click="close" v-on:wheel.stop v-on:mousewheel.stop>
      <slot v-bind:style="{'hidden':!isOpen}"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "popup-view",
  props: ["isOpen"],
  methods: {
    close() {
      this.$router.go(-1);
      this.$emit("update:isOpen", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.popup-view {
  &.popup-open {
    position: relative;
    z-index: 1;

    .cover {
      clip: unset;
    }
  }
  .cover {
    //display:none;
    //使用clip 修复transition时不消失
    clip: rect(0, 0, 0, 0);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
  }
}
</style>