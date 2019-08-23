<template>
  <input type="text" class="textbox" v-bind:placeholder="placeholder" />
</template>

<style lang="stylus" scoped>
.textbox {
  background: transparent
  border: none

  accent = colors.accent
  accent-transparent = alpha(accent, 0.6)

  border-bottom: solid accent-transparent 4px
  font-family: fonts-title
  font-size: 24px
  transition: border-bottom 120ms

  &:focus {
    border-bottom: solid accent 4px
  }

  &::placeholder {
    color: colors.text-light
  }

  &.body {
    font-family: fonts-body
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export default class TextBox extends Vue {
  @Prop({ type: String, default: "" }) placeholder!: string;
}
</script>
