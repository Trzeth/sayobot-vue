<template>
  <div class="popup" v-bind:class="{'popup-open':isOpen}">
    <div
      class="cover"
      v-on:click="close"
      v-on:wheel.stop
      v-on:mousedown.stop="close"
      v-on:mousewheel.stop
    >
      <slot name="inner"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "popup",
  props: ["isOpen"],
  methods: {
    close() {
      this.$emit("update:isOpen", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  &.popup-open {
    position: relative;
    z-index: 1;

    .cover {
      visibility: visible;
    }
  }
  .cover {
    visibility: hidden;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>