<template>
  <div class="worker-works">
    <div class="work-filter"></div>
    <div class="work-list">
      <table class="work-list-table">
        <th>
          <tt>ID</tt>
          <tt>Complaint</tt>
          <tt>Status</tt>
          <tt>Time</tt>
        </th>
        <tr v-for="issue in issues" :key="issue.id">
          <td>{{issue.id}}</td>
          <td>{{issue.complaint}}</td>
          <td>{{</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Issue } from "../../models/Room";

@Component({})
export default class WorkerHomepage extends Vue {
  issues: Issue[] = [];

  async getIssues() {}
}
</script>

<style lang="stylus" scoped></style>
