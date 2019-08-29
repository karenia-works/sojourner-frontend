<template>
  <div class="container">
    <div class="issue_id">Current Issue ID:{{GetQueryString("iid")}}</div>
    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>WID</td>
        <td>Worker Name</td>
        <td>Status</td>
        <td>Operate</td>
      </tr>
      <tr class="layer" v-for="worker in workers">
        <td>{{ worker.wid }}</td>
        <td>{{ worker.worker_name }}</td>
        <td>
          <label v-show="!worker.is_busy" class="yes_judge">Free</label>
          <label v-show="worker.is_busy" class="no_judge">Busy</label>
        </td>
        <td>
          <div class="SendWorker">
            <router-link to="ManageIssue">
              <button class="btn" v-show="!worker.is_busy">Send</button>
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

@Component({
  components: { dotsIcon }
})
export default class ManagerWorker extends Vue {
  workers = [
    {
      wid: 10,
      worker_name: "Clarissa Findlay",
      is_busy: false
    },
    {
      wid: 13,
      worker_name: "Elissa Dejesus",
      is_busy: true
    },
    {
      wid: 84,
      worker_name: "Cassidy Ayala",
      is_busy: false
    },
    {
      wid: 71,
      worker_name: "Tanner Espinosa",
      is_busy: false
    }
  ];

  GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
}
</script>
