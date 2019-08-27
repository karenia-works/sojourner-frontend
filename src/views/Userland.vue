<template>
  <!-- Root object for user pages -->
  <div id="userland normal-colors">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";

@Component({
  components: { Navbar }
})
export default class Userland extends Vue {}
</script>

<style lang="stylus">
#userland {
  color: var(--color-text-dark)
}

body {
  background: var(--color-bg-light)
}
</style>
