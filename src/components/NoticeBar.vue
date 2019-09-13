<template>
  <popup v-bind:isOpen.sync="isOpen">
    <div class="notice-bar-selection" v-if="isOpen">
      <article>
        <p>{{notices.content}}</p>
      </article>
    </div>
    <div class="notice-bar" @click="isOpen = true">
      <span class="iconfont icon-infomation"></span>
      {{notices.summary}}
    </div>
  </popup>
</template>

<script>
import Popup from "./Popup";
export default {
  name: "notice-bar",
  components: {
    Popup
  },
  props: ["notices"],
  data: function() {
    return {
      isOpen: false
    };
  }
};
</script>

<style lang="scss">
.notice-bar {
  cursor: pointer;
  text-align: left;
  width: 200px;
  height: 100%;
  line-height: 50px;
  color: #595959;
  border: 1px dashed #bfbfbf;
  border-radius: 25px;
  padding: 0 15px;
  box-sizing: border-box;

  .iconfont {
    font-size: 1.5rem;
    vertical-align: middle;
  }
}
.notice-bar-selection {
  position: absolute;
  background: #ffffff;
  border-radius: 25px;
  padding: 20px 10px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}
</style>