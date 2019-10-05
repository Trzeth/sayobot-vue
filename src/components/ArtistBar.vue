<template>
  <div class="artist-bar">
    <div class="artist-warpper" v-for="artist in artists">
      <div class="radius-image"></div>
      <h2 class="title">{{artist}}</h2>
      <span class="tags">Tags</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "artist-bar",
  data: function() {
    return {
      artists: ["Reol", "Trzeth", "Sayo", "Darrrrr", "Ueks"]
    };
  }
};
</script>
<style lang="scss">
$r: 140px;
.artist-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 30px;
}
.artist-warpper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
  .radius-image {
    width: $r;
    height: $r;
    background-position: center;
    background-size: cover;
    background: url("https://p1.music.126.net/iVbgMpzGJ-2RhqmvV0rhkg==/109951163033927826.jpg?param=400y400");
    border-radius: 50%;
    margin: 0 auto;
  }
  .title {
    margin-top: 5px;
    font-weight: 400;
  }
}
</style>