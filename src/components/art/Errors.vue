<template>
  <div class="error-art">
    <div v-if="errorCode == 0" />
    <no-content v-else-if="errorCode == 204" />
    <internal-server-error v-else-if="errorCode == 500" />
    <network-error v-else-if="errorCode == 999" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import InternalServerError from "./InternalServerError.vue";
import NetworkError from "./NetworkError.vue";
import NoContent from "./NoContent.vue";

@Component({
  components: {
    InternalServerError,
    NetworkError,
    NoContent
  }
})
export default class ErrorArt extends Vue {
  @Prop(Number)
  errorCode!: number;
}
</script>


<style lang="stylus" >
.error-art {
  padding-v: spaces._6
  lost-column: 1 / 1
  display: flex
  flex-direction: column
  align-items: center

  * {
    text-align: center
  }

  justify-content: center

  img {
    max-height: 40vh
  }
}
</style>
