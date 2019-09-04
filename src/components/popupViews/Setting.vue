<template>
  <div class="setting" v-on:click.stop>
    <div class="setting-page">
      <h2>设置</h2>
      <div>
        <h3>
          使用 Unicode 标题？
          <input type="checkbox" v-model="isUnicode" />
        </h3>
      </div>
      <div>
        <h3>
          自动选择最适合难度？
          <input type="checkbox" v-model="isAutoSelet" />
        </h3>
      </div>
      <div>
        <h3>
          默认服务器？
          <input type="checkbox" v-model="defaultServer" />
        </h3>
      </div>
    </div>
    <div class="About">
      <h2>关于</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "setting",
  data: function() {
    return {
      isUnicode: this.$localStorage.get("isUnicode"),
      isAutoSelet: this.$localStorage.get("isAutoSelet"),
      defaultServer: this.$localStorage.get("defaultServer")
    };
  },
  watch: {
    isUnicode: function(newValue) {
      console.log(newValue);
      this.$localStorage.set("isUnicode", newValue);
    },
    isAutoSelet: function(newValue) {
      this.$localStorage.set("isAutoSelet", newValue);
    },
    defaultServer: function(newValue) {
      this.$localStorage.set("defaultServer", newValue);
    }
  }
};
</script>

<style lang="scss">
.setting {
  width: 50%;
  padding: 15px;
  overflow: hidden;
  margin: 20px;
  border-radius: 25px;
  background: #ffffff;

  h2 {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 15px 0;
  }
  h3 {
    font-size: 1.2rem;
    font-weight: 500;
  }
}
</style>