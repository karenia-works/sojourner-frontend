<template>
  <div class="container">
    <div class="issue_id">Current Issue ID:{{ this.iid }}</div>
    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>WID</td>
        <td>Email</td>
        <td>Phone Number</td>
        <td>Gender</td>
        <td>Status</td>
        <td>Operate</td>
      </tr>
      <tr class="layer" v-for="(worker, index) in workers" :key="index">
        <td>{{ worker.id.substr(worker.id.length-4) }}</td>
        <td>{{ worker.email }}</td>
        <td>{{ worker.phoneNumber }}</td>
        <td>{{ worker.sex }}</td>
        <td>
          <label v-show="!worker.isRenting" class="yes_judge">Free</label>
          <label v-show="worker.isRenting" class="no_judge">Busy</label>
        </td>
        <td>
          <div class="SendWorker">
            <router-link to="ManageIssue">
              <button
                class="btn"
                v-show="!worker.isRenting"
                @click="SendWorker(worker, Issues)"
              >Send</button>
            </router-link>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  .issue_id {
    font-size: font-sizes.body-larger;
    font-weight: bold;
    padding: 20px;
  }

  .table {
    cellspacing = '0';
    cellpadding = '0';
    width: 100%;
    font-size: font-sizes.body-larger;

    .head {
      font-size: font-sizes.body-larger;
      font-weight: bold;
    }

    td {
      border-bottom: 1px solid var(--color-bg-medium);
      border-top: 1px solid var(--color-bg-medium);
      height: table-sizes.user;

      .ava_img {
        height: pic-sizes.avatar;
      }

      .yes_judge {
        font-weight: bold;
        color: var(--color-accent);
      }

      .no_judge {
        font-weight: bold;
        color: var(--color-error);
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dotsIcon from "mdi-vue/DotsVertical";
import axios from "axios";
import {updateProfile} from "@/helpers/profileHelper"
import { Profile } from '../../models/Room';

@Component({
  components: { dotsIcon }
})
export default class ManagerWorker extends Vue {
  workers:Profile[] = [];
  iid: string = this.GetQueryString("iid") as string;
  issue_api_url = "https://sojourner.rynco.me/api/v1/issue/";
  issue_send_api_url = "https://sojourner.rynco.me/api/v1/issue/sendWorker";

  Issues = [];

  origin_url = "https://sojourner.rynco.me/api/v1/profile/alluserlist/worker";
  api_url = "https://sojourner.rynco.me/api/v1/profile/alluserlist/worker";
  del_url = "https://sojourner.rynco.me/api/v1/profile/";

  getWorkerAPI() {
    axios
      .get(this.api_url, {
        headers: this.$store.getters.authHeader
      })
      .then(response => (this.workers = response.data))
      .catch(error => console.log(error));
  }

  getIssueAPI() {
    axios
      .get(this.issue_api_url + this.iid, {
        headers: this.$store.getters.authHeader
      })
      .then(response => (this.Issues = response.data))
      .catch(error => console.log(error));
  }

  mounted() {
    this.getIssueAPI();
    this.getWorkerAPI();
  }

  async SendWorker(worker:Profile, issue) {
    worker.isRenting = true;
    // issue.wemail = worker.email;

    let request1 = await axios.get(this.issue_send_api_url, {
      headers: this.$store.getters.authHeader,
      params: { id: this.iid, workEmail: worker.email }
    });
    if (request1.status < 200 && request1.status >= 300)
      throw new Error(
        `Can not add order! state: ${request1.status},id: ${worker.id}`
      );
    // console.log(worker);
    // updateProfile(worker.email, worker, this.$store.getters.authHeader);
  }

  GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
}
</script>
