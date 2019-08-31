<template>
  <popup class="setting-bar" v-bind:isOpen.sync="isOpen">
    <div class="setting-bar-selection" v-bind:class="{'setting-bar-selection-open':isOpen}">
      <ul>
        <li>帮助</li>
        <li>更新日志</li>
        <li>线路设置</li>
        <li>关于</li>
      </ul>
    </div>
    <span class="btn" v-on:click="isOpen =!isOpen">
      <span class="iconfont icon-setting"></span>
    </span>
  </popup>
</template>

<script>
import Popup from "./Popup";

export default {
  data: function() {
    return {
      isOpen: false
    };
  },
  components: {
    Popup
  },
  name: "setting-bar"
};
</script>

<style lang="scss">
.setting-bar {
  .setting-bar-selection {
    display: none;
    position: absolute;
    border-radius: 10px;
    padding: 5px 10px;
    white-space: nowrap;
    background: white;
    box-shadow: 0px 0px 3px 1px #dddddd;
    ul {
      text-align: left;
      padding: 0;
      list-style-type: none;
      li {
        padding: 5px 10px;
      }
    }

    &.setting-bar-selection-open {
      display: block;
    }
  }
}
</style>