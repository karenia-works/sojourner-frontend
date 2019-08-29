<template>
  <div class="newIssue">
    <h2>new issue</h2>
    <div class="form">
      <div class="item">
        <label for="description">What's your problem?</label>
        <textarea 
        type="text" class="input" rows="3"
        id="description" 
        v-model.trim="issue.complaint" />
      </div>

      <div class="item">
        <input type="checkbox" id="needRepair" v-model="issue.needRepair" />
        <label for="needRepair" class="checkLabel">{{repairText}}</label>
      </div>
    </div>
    <button class="btn">finish</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import {Issue} from "@/models/Room.ts";
import Checkbox from "@/components/Checkbox.vue";

@Component({})
export default class NewIssue extends Vue{
get repairText(): string {
  return this.issue.needRepair ?
    "need repair" : "not need repair";
}

  issue: Issue = { 
    id: "",
    uid: "",
    hid: "",
    wid: "",
    img: [],
    complaint: "",
    reply: "",
    needRepair: false,
    isReplied: false,
    isFinished: false,
    createTime: new Date()
  }
}
</script>

<style lang="stylus" scoped>
.item {
  margin-v spaces._6
}

label:first-child {
  display block
  font-size font-sizes.small-title
  font-family fonts-title
}

textarea {
  width 400px
}

.input {
  margin-left 0
}

input[type=checkbox]{
  display none
}

.checkLabel {
  color: var(--color-text-medium)
  font-weight: 400
  transition: all 250ms
  font-size: font-sizes.body-larger
  font-family: fonts-title

  &:hover {
    color: var(--color-text-dark)
  }
}

input:checked+.checkLabel {
  color: var(--color-text-dark)
  font-weight: 500
  background: linear-gradient(180deg, transparent 0% 50%, var(--color-accent-transparent) 50% 100%)

  &:hover {
  }
}

</style>