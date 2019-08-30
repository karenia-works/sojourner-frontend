<template>
<div class="radio">
  <div class="subitem" v-for="(item, index) in values" :key="item" >
    <input type="radio" 
      :id="item" :value="item" 
      v-model="type">
    <label :for="item" class="label">{{texts[index]}}</label>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync } from "vue-property-decorator";

@Component({
  
})
export default class Radio extends Vue {
  @Prop() values!: Array<string>;
  @Prop() texts!: Array<string>;
  @PropSync("roomType", { default: "single", type: String })
  type!: string;  
}
</script>

<style lang="stylus" scoped>
input[type=checkbox], input[type=radio] {
  display none
}

input:checked+label {
  color: var(--color-text-dark)
  font-weight: 500
  background: linear-gradient(180deg, transparent 0% 50%, var(--color-accent-transparent) 50% 100%)
}

.subitem {
  display inline-block
  margin-right spaces._4
}

.label {
  color: var(--color-text-medium)
  font-weight: 400
  transition: all 250ms
  font-size: font-sizes.body-larger
  font-family: fonts-title


  &:hover {
    color: var(--color-text-dark)
  }

  &.selected {
    

    &:hover {
    }
  }
}
</style>

