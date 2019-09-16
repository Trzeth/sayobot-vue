<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: "Sayobot osu! 镜像站 | Beatmap mirror",
    meta: [
      {
        name: "description",
        content:
          "osu.sayobot.cn是全球最大、地图存储量最多(超过2000GB)的第三方osu!镜像站，致力于为广大玩家提供osu!周边的服务，包括但不限于osu!地图的搜索下载、提供osu!外设(小键盘和数位板)、图包&皮肤分享/下载、osu! QQ机器人等。"
      },
      {
        name: "keyword",
        content:
          "osu!，osu! Beatmap mirror，大陆，国内，镜像，加速，下载，高速，急速，光速，BloodCat，血猫，osu.ppy.sh，osu.sayobot.cn，bloodcat.com/osu，inso，inso.link，小夜，_BlackC，SoulDee,Trzeth"
      }
    ],
    link: [
      {
        //<link rel="icon" type="image/x-icon" href="favicon.ico">
        rel: "icon",
        type: "image/png",
        href: "/favicon.png"
      }
    ]
  }
};
</script>
<style lang="scss">
</style>
