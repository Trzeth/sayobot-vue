<template>
  <div id="app">
    <vue-better-scroll
      :listenScroll="listenScroll"
      :scrollbar="scrollbarObj"
      :pullDownRefresh="pullDownRefreshObj"
      :pullUpLoad="pullUpLoadObj"
      :startY="parseInt(startY)"
    >
      <router-view></router-view>
    </vue-better-scroll>
  </div>
</template>

<script>
import VueBetterScroll from "vue2-better-scroll";

export default {
  data: function() {
    return {
      listenScroll: true,
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      scrollbarObj: {
        fade: true
      },
      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      pullDownRefreshObj: {
        threshold: 90,
        stop: 40
      },
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: "加载更多",
          noMore: "没有更多数据了"
        }
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: []
    };
  },
  components: VueBetterScroll
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
