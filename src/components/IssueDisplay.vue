<template>
  <div class="issue-line">
    <div class="issue-id">#{{issue.id}}</div>
    <div class="issue-complaint">{{truncatedComplaint}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Issue, exampleIssue } from "@/models/Room";
@Component({})
export default class IssueDisplay extends Vue {
  @Prop({ type: Object, default: () => exampleIssue }) issue!: Issue;

  truncate: boolean = true;

  get truncatedComplaint() {
    if (this.truncate && this.issue.complaint.length > 80)
      return this.issue.complaint.substring(0, 80) + "...";
    else return this.issue.complaint;
  }
}
</script>

<style lang="stylus" scoped>
.issue-line {
}
</style>
