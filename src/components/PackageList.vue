<template>
  <div class="package-list">
    <package v-for="p in packageData" v-bind:key="p.pid" v-bind:packageData="p"></package>
  </div>
</template>

<script>
import axios from "axios";
import Package from "@/components/Package.vue";

var Mock = require("mockjs");

Mock.mock("/api/packagelist", {
  status: 0,
  "data|2": [
    {
      title: "Test Package 1",
      creator: "Trzeth",
      coverId: 868652,
      "likes|0-1000": 100,
      pid: "15000"
    },
    {
      title: "Test Package 2",
      creator: "Trzeth",
      coverId: 984990,
      "likes|0-1000": 100,
      pid: "15001"
    },
    {
      title: "Test Package 3",
      creator: "Trzeth",
      coverId: 1018134,
      "likes|0-1000": 100,
      pid: "15002"
    },
    {
      title: "Test Package 4",
      creator: "Trzeth",
      coverId: 1028944,
      "likes|0-1000": 100,
      pid: "15003"
    }
  ]
});

export default {
  name: "package-list",
  data: function() {
    return {
      packageData: null
    };
  },
  components: {
    Package
  },
  mounted: function() {
    axios.get("/api/packagelist").then(response => {
      this.packageData = response.data.data;
    });
  }
};
</script>

<style lang="scss">
.package-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 50px;
  grid-row-gap: 20px;
  margin: 0 50px;
}
</style>