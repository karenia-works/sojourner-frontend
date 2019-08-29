<template>
<div>
  <input type="checkbox" :id="cId" v-model="checked" />
  <label :for="cId" class="checkLabel" :class="{selected: checked}">{{cText}}</label>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync } from "vue-property-decorator";

@Component({
  
})
export default class Checkbox extends Vue {
  @Prop() cId!: string;
  @Prop() cText!: string;
  @PropSync("picked", { default: false, type: Boolean })
  checked!: boolean;  
}
</script>

<style lang="stylus" scoped>
input[type=checkbox]{
  display none
}

// input:checked+label {
//   color red
// }

.checkLabel {
  color: var(--color-text-medium)
  font-weight: 400
  transition: all 250ms
  font-size: font-sizes.body-larger
  font-family: fonts-title

  &:hover {
    color: var(--color-text-dark)
  }

  &.selected {
    color: var(--color-text-dark)
    font-weight: 500
    background: linear-gradient(180deg, transparent 0% 50%, var(--color-accent-transparent) 50% 100%)

    &:hover {
    }
  }
}
</style>

