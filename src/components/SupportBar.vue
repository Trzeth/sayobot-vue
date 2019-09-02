<template>
  <div class="support-btn" @click="open">
    <span class="text">Support</span>
    <span class="iconfont icon-heart-fill"></span>
  </div>
</template>

<script>
export default {
  name: "support-bar",

  methods: {
    open() {
      this.$router.push("support");
    }
  }
};
</script>

<style lang="scss" scoped>
.support-btn {
  cursor: pointer;
  margin: 20px 20px 20px 100px;
  width: 95px;
  height: 120px;
  border-radius: 10px;
  background: #e4007f;
  color: #ffffff;
  .text {
    display: inline-block;
    font-size: 1.4rem;
    height: 100%;
    vertical-align: middle;
    writing-mode: vertical-rl;
  }
  .iconfont {
    vertical-align: middle;
    font-size: 2.5rem;
  }
}

@media screen and (max-width: 480px) {
  .support-btn {
    margin-left: 40px;
  }
}
</style>