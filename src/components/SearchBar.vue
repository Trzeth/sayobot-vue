<template>
  <div class="search-bar-warpper">
    <div class="cover" v-bind:class="{'cover-visible':isFocused}" v-on:click="isFocused = false;"></div>

    <div class="search-bar" v-bind:class="{'search-bar-focused':isFocused}">
      <input
        autocomplete="off"
        spellcheck="false"
        id="search-bar-input"
        type="text"
        v-on:focus="isFocused = true"
        placeholder="输入关键词开始搜索"
        v-model="searchOptine.keyword"
      />
      <div class="search-bar-icon">
        <label class="iconfont icon-filter" v-on:click="isFilterOpen =! isFilterOpen;"></label>
        <label class="iconfont icon-search" for="search-bar-input"></label>
      </div>
      <label v-on:click="search" class="search-bar-btn iconfont icon-arrowright"></label>
    </div>

    <div
      class="search-bar-filter"
      v-bind:class="{'search-bar-filter-open':isFilterOpen&&isFocused}"
    >
      <div>
        Mode:
        <input type="checkbox" id="std" value="1" v-model="optine.mode" />
        <label for="std">std</label>
        <input type="checkbox" id="taiko" value="2" v-model="optine.mode" />
        <label for="taiko">taiko</label>
        <input type="checkbox" id="ctb" value="4" v-model="optine.mode" />
        <label for="ctb">ctb</label>
        <input type="checkbox" id="mania" value="8" v-model="optine.mode" />
        <label for="mania">mania</label>
      </div>
      <div>
        Class:
        <input type="checkbox" id="ranked-approved" value="1" v-model="optine.class" />
        <label for="ranked-approved">Ranked & Approved</label>
        <input type="checkbox" id="qualified" value="2" v-model="optine.class" />
        <label for="qualified">Qualified</label>
        <input type="checkbox" id="loved" value="4" v-model="optine.class" />
        <label for="loved">Loved</label>
        <input type="checkbox" id="pending-wip" value="8" v-model="optine.class" />
        <label for="pending-wip">Pending & WIP</label>
        <input type="checkbox" id="graveyard" value="8" v-model="optine.class" />
        <label for="graveyard">Graveyard</label>
      </div>
      <div>
        Genre:
        <input type="checkbox" id="any" value="1" v-model="optine.genre" />
        <label for="any">Any</label>
        <input type="checkbox" id="unspecified" value="2" v-model="optine.genre" />
        <label for="unspecified">Unspecified</label>
        <input type="checkbox" id="video-game" value="4" v-model="optine.genre" />
        <label for="video-game">Video Game</label>
        <input type="checkbox" id="anime" value="8" v-model="optine.genre" />
        <label for="anime">Anime</label>
        <input type="checkbox" id="rock" value="16" v-model="optine.genre" />
        <label for="rock">Rock</label>
        <input type="checkbox" id="pop" value="32" v-model="optine.genre" />
        <label for="pop">Pop</label>
        <input type="checkbox" id="other" value="64" v-model="optine.genre" />
        <label for="other">Other</label>
        <input type="checkbox" id="novelty" value="128" v-model="optine.genre" />
        <label for="novelty">Novelty</label>
        <input type="checkbox" id="hip_hop" value="256" v-model="optine.genre" />
        <label for="hip_hop">Hip Hop</label>
        <input type="checkbox" id="electronic" value="1024" v-model="optine.genre" />
        <label for="electronic">Electronic</label>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-bar",
  data: function() {
    return {
      isFilterOpen: false,
      isFocused: false,
      optine: this.searchOptine
    };
  },
  props: ["searchOptine"],
  methods: {
    search() {
      this.isFocused = false;
      this.$router
        .push({
          path: "search",
          query: {
            keyword: this.searchOptine.keyword
          }
        })
        // eslint-disable-next-line
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss">
.search-bar-warpper {
  text-align: center;
  position: relative;
  z-index: 1;

  .cover {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .cover-visible {
    display: block;
  }

  .search-bar {
    transform: scale(1);
    transition: box-shadow 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    border: 1px solid #d9d9d9;
    height: 50px;
    overflow: hidden;
    border-radius: 10px;
    display: inline-flex;
    align-content: stretch;
    background: #ffffff;
    line-height: 50px;
    box-shadow: 0 0 0 2px transparent;

    .search-bar-icon {
      order: 1;
      position: relative;
      width: 50px;
      label {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        font-size: 1.5rem;
        transition: opacity 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      }

      label.icon-search {
        color: #e6e6e6;
      }
      label.icon-filter {
        display: none;
        color: #000;
      }
    }

    input {
      order: 2;
      padding: 0;
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      outline: 0;
      height: 100%;
      border: none;
      font-size: 1rem;
    }
    input::placeholder {
      color: #e6e6e6;
    }

    &.search-bar-focused {
      border-color: transparent;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);

      input {
        padding-right: 10rem;
      }
      .search-bar-icon {
        .icon-search {
          display: none;
        }
        .icon-filter {
          display: inherit;
          cursor: pointer;
        }
      }
      .search-bar-btn {
        opacity: 1;
        transform: rotate(0);
        cursor: pointer;
      }
    }
    &:hover {
      .search-bar-icon {
        .icon-search {
          color: #d9d9d9;
        }
      }
    }
    .search-bar-btn {
      width: 50px;
      font-size: 1.5rem;
      display: block;
      order: 3;
      box-sizing: border-box;
      padding: 0 10px;
      opacity: 0;
      transform: rotate(-180deg);
      transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .search-bar-btn:hover {
      opacity: 0.25;
    }
  }

  .search-bar-filter {
    text-align: left;
    position: absolute;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 5px #dddddd;
    margin-top: 5px;
    padding: 10px 15px;
    background: #ffffff;
    box-sizing: border-box;
    opacity: 0;
    display: none;
    &.search-bar-filter-open {
      opacity: 1;
      display: block;
    }
  }
}
</style>