<template>
  <div class="setting-bar">
    <div class="cover" v-bind:class="{'cover-visible':isOpen}" v-on:click="isOpen = false;"></div>
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
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isOpen: false
    };
  },
  name: "setting-bar"
};
</script>

<style lang="scss">
.setting-bar {
  position: relative;

  .cover {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .cover-visible {
    display: block;
  }
  .setting-bar-selection {
    z-index: 2;
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