<!-- 废弃 -->
<template>
  <popup
    v-bind:isOpen="isOpenN"
    v-on:update:isOpen="isOpenChange"
    v-bind:coverStyle="{background:'rgba(0,0,0,0.5)',display:'flex','justify-content':'center','align-items': 'stretch'}"
  >
    <template v-slot:inner>
      <div class="detail-card" v-on:click.stop>
        <h2>支持一下小夜吧!</h2>
      </div>
    </template>
  </popup>
</template>

<script>
import Popup from "./Popup";
import { watch } from "fs";

export default {
  name: "detail-card",
  data: function() {
    return {
      isOpenN: this.isOpen
    };
  },
  props: ["sid", "isOpen"],
  components: {
    Popup
  },
  methods: {
    isOpenChange() {
      console.log("closed");
      this.$emit("update:isOpen", false);
    }
  },
  watch: {
    isOpen: function() {
      this.isOpenN = this.isOpen;
    }
  }
};
</script>

<style lang="scss">
.detail-card {
  flex: 1;
  background: #fff;
  border-radius: 25px;
  margin: 100px;
  overflow: hidden;
}
</style>