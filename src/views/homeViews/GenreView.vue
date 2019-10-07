<template>
  <div class="genre-view view">
    <div class="left">
      <ul>
        <li>全部</li>
        <li>尚未指定</li>
        <li>电子游戏</li>
        <li>动漫</li>
        <li>摇滚</li>
        <li>流行乐</li>
        <li>其他</li>
        <li>新奇</li>
        <li>嘻哈</li>
        <li>电子</li>
      </ul>
    </div>
    <div class="right">
      <preview-card-list v-bind:beatmapsetList="beatmapsetList"></preview-card-list>
    </div>
  </div>
</template>

<script>
import PreviewCardList from "@/components/PreviewCardList";
import axios from "axios";

export default {
  name: "genre-view",
  components: {
    PreviewCardList
  },
  data: function() {
    return {
      limit: 24,
      offset: 0,
      //Binding to SearchBar changed with input
      searchOptine: {
        keyword: "",
        subType: [],
        mode: [],
        class: [],
        genre: [],
        language: [],
        other: ""
      },
      beatmapsetList: []
    };
  },
  methods: {
    toUri(searchOptine, limit, offset = 0) {
      var host = "https://api.sayobot.cn";
      var uri = host + "/beatmaplist";
      uri += "?0=" + limit;
      uri += "&";
      uri += "1=" + offset;
      uri += "&";
      uri += "2=" + 4;
      uri += "&";
      uri += "3=" + searchOptine.keyword;
      var temp = 0;
      temp = this.sum(searchOptine.subType);
      uri += temp ? "&4=" + temp : "";
      temp = this.sum(searchOptine.mode);
      uri += temp ? "&5=" + temp : "";
      temp = this.sum(searchOptine.class);
      uri += temp ? "&6=" + temp : "";
      temp = this.sum(searchOptine.genre);
      uri += temp ? "&7=" + temp : "";
      temp = this.sum(searchOptine.language);
      uri += temp ? "&8=" + temp : "";
      return uri;
    },
    sum(params) {
      var sum = 0;
      if (params != null) {
        params.forEach(element => {
          sum += Number(element);
        });
      }
      return sum;
    }
  },
  watch: {
    "$route.query.keyword": {
      immediate: true,
      deep: true,
      handler: function() {
        this.searchOptine.keyword = this.$route.query.keyword;
        axios.get(this.toUri(this.searchOptine, this.limit)).then(response => {
          this.beatmapsetList = response.data.data;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/view.scss";
</style>