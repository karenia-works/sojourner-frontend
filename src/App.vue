<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="stylus">
@import 'styles/common-styles.styl'

#app {
  font-family: fonts-body
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center
  --accent-color: var(--color-accent)
  height: 100%
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {}
</script>
