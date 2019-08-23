<template>
  <div class="btn">
    <span class="btn-span">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Btn extends Vue {
  @Prop(String) label!: string;
}
</script>

<style lang="stylus" scoped>
.btn {
  font-family: fonts-title
  font-size: 24px
  font-weight: bold
}

.btn-span {
  gradient-hover(colors.accent, 4px)

  padding-h: 4px
}
</style>
