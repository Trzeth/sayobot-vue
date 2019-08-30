<template>
  <div class="popup">
    <div class="cover" v-bind:class="{'visible':isOpen}" v-on:click="close"></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "popup",
  data: function() {
    return {
      isOpen: false
    };
  },
  methods: {
    close() {
      isOpen = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.cover {
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;

  &.visible {
    display: block;
  }
}
</style>