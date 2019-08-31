<template>
  <div class="page">
    <div
      class="login-worker"
      v-if="!$store.state.userStore || !$store.state.userStore.loggedIn || $store.state.userStore.role!='worker'"
    >
      <login :showSignUp="false" :show="true">
        <h1 slot="title">Sign in as worker</h1>
      </login>
    </div>
    <div class="worker-works container" v-else>
      <div class="work-filter"></div>
      <h1>Works assigned to me</h1>
      <div class="work-list">
        <issue-display />
        <!-- <div class="issue-line" v-for="issue in issues" :key="issue.id">
          <div class="issue-id">{{issue.id}}</div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Issue } from "../../models/Room";
import Axios from "axios";
import config from "@/config";
import Login from "@/views/Login.vue";
import IssueDisplay from "@/components/IssueDisplay.vue";

@Component({
  components: { Login, IssueDisplay }
})
export default class WorkerHomepage extends Vue {
  issues: Issue[] = [];

  getStatus(issue: Issue) {
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

  async getIssues() {
    await Axios.get(
      config.backend.address + "issue/IssueByWid",
      this.$store.getters.authHeader
    );
  }
}
</script>

<style lang="stylus" scoped>
.work-list ,.worker-works{
  display: flex
  flex-direction: column
  align-items: stretch
}

.worker-list-table {
  width: 100
}
</style>
