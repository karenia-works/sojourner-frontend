<template>
  <!-- Root page for admin pages -->
  <div class="admin-world admin-cyan">
    <navbar-admin></navbar-admin>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavbarAdmin from "@/components/NavbarAdmin.vue";

@Component({
  components: { NavbarAdmin }
})
export default class AdminWorld extends Vue {}
</script>

<style lang="stylus">
#userland {
  color: colors-admin.text-dark
}

body {
  background: colors-admin.bg-light
}
</style>
