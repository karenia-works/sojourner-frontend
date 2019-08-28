<template>
  <div>
    <h1>Page 404 not found</h1>what's your looking for?
  </div>
</template>

<style lang="stylus" scoped>
h1 {
  font-size: font-sizes.huge-title
  font-weight: normal
  text-transform: uppercase
  text-align: center
}
</style>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FileSelection from "@/components/FileSelection.vue";

@Component({
  components: {}
})
export default class NotFound extends Vue {}
</script>
