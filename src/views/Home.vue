<template>
  <div class="home">
    <div class="container">
      <div class="jumbotron">
        <h1>Arriving Alone?</h1>
        <p>Here's a worry-free flat renting service, designed for people just like you.</p>
        <img src="../assets/sojourner-trails.svg" alt id="index-trail-pic" />
      </div>
      <search-bar :status.sync="searchStatus" @search="onSearch"></search-bar>
    </div>
    <!-- <div class="background color-darker">
      <div class="container" id="explore">
        <div class="row">
          <h1>Explore</h1>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style lang="stylus" scoped>
.jumbotron {
  margin-top: spaces._10
  margin-bottom: spaces._8
  text-align: left
  lost-column: 1 / 1

  p {
    font-weight: 500
  }

  h1 {
    margin-v: spaces._3
    max-width: 50%
  }
}

.index-img {
  +break-screen(breakpoints.medium, 0) {
    position: absolute
    right: 0px
    width: 640px
  }

  +break-screen(0, breakpoints.medium) {
    margin-right: -(spaces._3)
  }
}

#index-trail-pic {
  position: absolute
  top: 80px
  height: 384px
  right: 64px
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";
import { SearchStatus } from "../store/search";

@Component({
  components: {
    HelloWorld,
    SearchBar
  }
})
export default class Home extends Vue {
  get searchStatus(): SearchStatus {
    return this.$store.state.searchStore.status;
  }
  set searchStatus(value: SearchStatus) {
    this.$store.commit("replaceSearch", value);
  }

  onSearch(value: SearchStatus) {
    this.$store.commit("replaceSearch", value);
    console.log("search!", SearchStatus);
    this.$router.push({ name: "search", query: value.toDictionary() });
  }
}
</script>
