<template>
<div>
  <input type="checkbox" :id="cId" 
  v-model="checked">
  <label :for="cId">{{cText}}</label>
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
input[type=checkbox], input[type=radio] {
  display none
}

input:checked+label {
  color red
}
</style>

