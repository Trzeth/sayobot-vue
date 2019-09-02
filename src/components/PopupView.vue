<template>
  <div class="popup" v-bind:class="{'popup-open':isOpen}">
    <div
      class="cover"
      v-on:click="close"
      v-bind:style="coverStyle"
      v-on:wheel.stop
      v-on:mousewheel.stop
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
import SupportBar from "./SupportBar";
import SettingBar from "./SettingBar";

export default {
  name: "popup-view",
  components: {
    SupportBar,
    SettingBar
  },
  props: ["isOpen", "coverStyle"],
  methods: {
    close() {
      this.$router.go(-1);
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
  }
}
</style>