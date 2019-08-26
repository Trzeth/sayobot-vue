<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
header {
  .title {
    text-align: center;
  }
  .search-bar {
    text-align: center;
  }
}
.preview-card-list {
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
