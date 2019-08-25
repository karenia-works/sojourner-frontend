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

h1,
h2,
h3,
h4 {
  font-family: fonts-title
}

h1 {
  font-size: 48px
}

h2 {
  font-size: 32px
}

h3 {
  font-size: 28px
}

h4 {
  font-size: 24px
}

div a {
  color: inherit
  font: inherit
  display: inherit

  p a {
    display: inline
  }

  text-decoration: inherit
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
