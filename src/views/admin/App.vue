<template>
  <!-- Root page for admin pages -->
  <div class="admin-world">
    <!-- <navbar></navbar> -->
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {  }
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
