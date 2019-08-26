<template>
  <!-- Root object for user pages -->
  <div id="userland">
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
  color: colors.text-dark
}

body {
  background: colors.bg-light
}
</style>
