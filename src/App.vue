<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<style lang="stylus">
#app {
  font-family: fonts-body
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: colors.text-dark
}

body {
  background: colors.bg-light
  padding: 0px
  margin: 0px
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Navbar from "@/components/Navbar.vue";

@Component({
  components: { Navbar }
})
export default class App extends Vue {}
</script>
