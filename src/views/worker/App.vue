<template>
  <!-- Root page for worker pages -->
  <div class="worker-page admin-cyan">
    <!-- <navbar></navbar> -->
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class WorkerPage extends Vue {}
</script>

<style lang="stylus">
#userland {
  color: colors-admin.text-dark
}

body {
  background: colors-admin.bg-light
}
</style>
