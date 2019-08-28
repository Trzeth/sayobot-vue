<template>
  <div class="notice-bar">
    <span class="iconfont icon-infomation"></span>
    {{notices.summary}}
  </div>
</template>

<script>
export default {
  name: "notice-bar",
  props: ["notices"]
};
</script>

<style lang="scss">
.notice-bar {
  text-align: left;
  width: 200px;
  height: 100%;
  line-height: 50px;
  color: #595959;
  border: 1px dashed #bfbfbf;
  border-radius: 25px;
  padding: 0 15px;
  box-sizing: border-box;
}
</style>