<template>
  <div class="home">
    <div class="jumbotron">
      <h1>Arriving Alone?</h1>
    </div>
    <search-bar></search-bar>
  </div>
</template>

<style lang="stylus" scoped>
.jumbotron {
  h1 {
    font-size: 72px
    font-weight: normal
    text-transform: uppercase
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";

@Component({
  components: {
    HelloWorld,
    SearchBar
  }
})
export default class Home extends Vue {}
</script>
