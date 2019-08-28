<template>
  <!-- Root object for user pages -->
  <div id="userland" class="normal-colors">
    <navbar></navbar>
    <router-view id="userland-body" />
    <footer-component></footer-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";
import FooterComponent from "@/components/Footer.vue";

@Component({
  components: { Navbar, FooterComponent }
})
export default class Userland extends Vue {}
</script>

<style lang="stylus">
#userland {
  color: var(--color-text-dark)
  display: flex
  flex-direction: column
}

#userland-body {
  flex-grow: 1
}

body {
  background: var(--color-bg-light)
}

html,
#userland,
body {
  height: 100%
}
</style>
