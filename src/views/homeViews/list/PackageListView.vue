<template>
  <div class="package-list-view view">
    <div class="left">
      <h2>全部</h2>
      <ul>
        <li>
          <router-link class="btn" to="new">
            <span>R</span>推荐图包
          </router-link>
        </li>
        <li>
          <router-link class="btn" to="hot">
            <span class="iconfont icon-pushpin"></span>精选图包
          </router-link>
        </li>
        <li>
          <router-link class="btn" to="hot">
            <span class="iconfont icon-fire"></span>热门图包
          </router-link>
        </li>
        <li>
          <router-link class="btn" to="hot">
            <span class="iconfont icon-time-circle"></span>最新图包
          </router-link>
        </li>
      </ul>
    </div>
    <div class="right">
      <package-list></package-list>
    </div>
  </div>
</template>

<script>
import PackageList from "@/components/PackageList.vue";
export default {
  name: "package-list-view",
  components: {
    PackageList
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/view.scss";
</style>