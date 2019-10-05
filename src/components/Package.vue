<template>
  <div class="package">
    <router-link v-bind:to="packageUrl">
      <div class="preview-image-warpper">
        <div
          class="preview-image"
          v-bind:style="{backgroundImage: 'url(https://cdn.sayobot.cn:25225/beatmaps/' + packageData.coverId + '/covers/cover.jpg'}"
        ></div>
      </div>
    </router-link>

    <div class="detail">
      <router-link v-bind:to="packageUrl">
        <span class="title">{{packageData.title}}</span>
      </router-link>
      <span class="creator">
        {{packageData.creator}}
        <span class="iconfont icon-play-circle-fill"></span>
        {{packageData.likes}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "package",
  props: ["packageData"],
  computed: {
    packageUrl: function() {
      return "package/" + this.packageData.pid;
    }
  }
};
</script>

<style lang="scss">
.package {
  padding-bottom: 20px;
  .preview-image-warpper {
    position: relative;
    width: 200px;

    &:hover {
      &::before {
        right: -10px;
        transform: scale(0.82);
      }
      &::after {
        right: -20px;
        transform: scale(0.7);
      }
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      transform-origin: 100% 50%;
      z-index: -1;
      border-radius: 5px;
      transition: right 0.2s ease-in-out, transform 0.2s ease-in-out;
    }
    &::before {
      transform: scale(0.85);
      background-color: #d9d9d9;
      right: -6px;
    }
    &::after {
      content: "";
      transform: scale(0.73);
      background-color: #d9d9d9;
      right: -12px;
      opacity: 0.5;
    }

    .preview-image {
      transition: background-position 0.8s ease-in-out;
      transition-delay: 0.1s;
      background-position: center;
      background-size: cover;
      border-radius: 5px;
      display: block;
      width: 200px;
      height: 150px;
      margin: 0 auto;
    }
  }

  .detail {
    margin-top: 5px;
    > .title {
      display: block;
      font-size: 1.2rem;
    }
    > .creator {
      color: #595959;
      display: block;
      font-size: 1rem;
    }
  }
}
</style>