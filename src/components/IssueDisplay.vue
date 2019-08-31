<template>
  <div class="issue-line">
    <div class="issue-id">#{{issue.id}}</div>
    <div class="issue-complaint" @click="switchTruncate">
      <vue-markdown :source="truncatedComplaint" />
      <span v-if="truncate" class="expand">Click to expand</span>
    </div>
    <div class="issue-images" v-if="!truncate">
      <img :src="img" alt v-for="img in issue.img" :key="img" />
    </div>
    <div class="issue-submit" v-if="!truncate">
      <button class="btn" @click="submit">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Issue, exampleIssue } from "@/models/Room";
import VueMarkdown from "vue-markdown";
import axios from "axios";
import config from "../config";

@Component({
  components: { VueMarkdown }
})
export default class IssueDisplay extends Vue {
  @Prop({ type: Object, default: () => exampleIssue }) issue!: Issue;

  truncate: boolean = true;

  private readonly subStringLimit = 200;

  switchTruncate() {
    this.truncate = !this.truncate;
  }

  get truncatedComplaint() {
    if (this.truncate && this.issue.complaint.length > this.subStringLimit)
      return this.issue.complaint.substring(0, this.subStringLimit) + "...";
    else return this.issue.complaint;
  }

  get status() {
    let issue = this.issue;
    if (issue.needRepair) {
      if (issue.isReplied) {
        return "Replied";
      } else if (issue.isFinished) {
        return "Finished";
      } else {
        return "Open";
      }
    } else return "Open";
  }

  @Emit("finish")
  async submit() {
    await axios.get(config.backend.address + "issue/confirmFinish", {
      headers: this.$store.getters.authHeader,
      params: { id: this.issue.id }
    });
    return this.issue.id;
  }
}
</script>

<style lang="stylus" scoped>
.issue-line {
  display: flex
  flex-direction: column
}

.col-1 {
  lost-column: 7 / 12
}

.issue-id {
  font-size: font-sizes.body-smaller
  font-weight: 700
  color: var(--color-text-medium)
}

.issue-images {
  img {
    max-width: 60%
  }
}

.expand {
  color: var(--color-accent-z)
  font-weight: bold
}

.btn {
  font-size: font-sizes.medium-title
}
</style>
