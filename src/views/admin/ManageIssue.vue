<template>
  <div class="container">
    <div class="search-line">
      <input
        type="text"
        class="input"
        placeholder="Type in the issue you would like to find"
        v-model.trim="keyword"
      />
      <button class="btn" @click="reRoute">Search</button>
    </div>
    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>IID</td>
        <td>Room Name</td>
        <td>Lessee</td>
        <td>Worker</td>
        <td>Reported</td>
        <td>Replied&ensp;</td>
        <td>Sended</td>
        <td>Repaired</td>
        <td>More</td>
      </tr>
      <tr class="layer" v-for="(Issue, index) in Issues" :key="index">
        <td>{{ Issue.id.substr(Issue.id.length-4) }}</td>
        <td>{{ Issue.hid.substr(Issue.hid.length-4) }}</td>
        <td>{{ Issue.uemail }}</td>
        <td>{{ Issue.worker_name }}</td>
        <td>
          <div
            :class="{'line':true , 'line1':!Issue.isReplied, 'line2':Issue.isReplied&&(Issue.wemail==null), 'line3': Issue.isReplied&&(Issue.wemail!=null)&&!Issue.isFinished, 'line4': Issue.isReplied&&(Issue.wemail!=null)&&Issue.isFinished}"
          ></div>
        </td>
        <td>
          <div
            :class="{'line':true , 'lineE':!Issue.isReplied, 'line2':Issue.isReplied&&(Issue.wemail==null), 'line3': Issue.isReplied&&(Issue.wemail!=null)&&!Issue.isFinished, 'line4': Issue.isReplied&&(Issue.wemail!=null)&&Issue.isFinished}"
          ></div>
        </td>
        <td>
          <div
            :class="{'line':true , 'lineE':!Issue.isReplied, 'lineE':Issue.isReplied&&(Issue.wemail==null), 'line3': Issue.isReplied&&(Issue.wemail!=null)&&!Issue.isFinished, 'line4': Issue.isReplied&&(Issue.wemail!=null)&&Issue.isFinished}"
          ></div>
        </td>
        <td>
          <div
            :class="{'line':true , 'lineE':!Issue.isReplied, 'lineE':Issue.isReplied&&!Issue.isFinished, 'lineE': Issue.isReplied&&(Issue.wemail!=null)&&!Issue.isFinished, 'line4': Issue.isReplied&&(Issue.wemail!=null)&&Issue.isFinished}"
          ></div>
        </td>
        <td>
          <div class="dropdown">
            <button class="dropbtn">
              <dotsIcon />
            </button>
            <div class="dropdown-content">
              <router-link :to="getReplyUrl(Issue.id)" v-show="!Issue.isReplied">Reply</router-link>
              <router-link
                :to="getWorkerUrl(Issue.id)"
                v-show="Issue.isReplied&&!Issue.isFinished&&Issue.wemail==null"
              >Send Worker</router-link>
              <router-link to>Delete</router-link>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  .search-line {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-bottom: 60px;

    .input {
      lost-column: 9 / 12;
    }
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

.dropbtn {
  background-color: var(--color-bg-light);
  padding: 12px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--color-bg-light);
  min-width: 160px;
  border: 1px solid var(--color-bg-medium);
}

.dropdown-content a {
  padding: 13px 13px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: var(--color-bg-medium);
}

.dropdown:hover .dropdown-content {
  display: inline;
}

.dropdown:hover .dropbtn {
  background-color: var(--color-bg-medium);
}

.line {
  width: 100%;
  height: 20%;
}

.line1 {
  background: var(--color-error);
}

.line2 {
  background: #FFC85F;
}

.line3 {
  background: #3389cc;
}

.line4 {
  background: var(--color-accent);
}

.lineE {
  background: transparent;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dotsIcon from "mdi-vue/DotsVertical";
import searchbarAdmin from "@/components/SearchBarAdmin.vue";
import axios from "axios";
import moment from "moment";

@Component({
  components: { dotsIcon, searchbarAdmin }
})
export default class ManageIssue extends Vue {
  Issues = [];

  origin_url = "https://sojourner.rynco.me/api/v1/issue/issuelist";
  api_url = "https://sojourner.rynco.me/api/v1/issue/issuelist";
  keyword = "";

  getWorkerUrl(iid: number) {
    return "ManageWorker?iid=" + iid;
  }

  getReplyUrl(iid: number) {
    return "reply?iid=" + iid;
  }

  getAPI() {
    axios
      .get(this.api_url, {
        headers: this.$store.getters.authHeader
      })
      .then(response => (this.Issues = response.data))
      .catch(error => console.log(error));
  }

  mounted() {
    this.getAPI();
  }

  reRoute() {
    if (this.keyword == "") this.api_url = this.origin_url;
    else this.api_url = this.origin_url + "?kw=" + this.keyword;
    this.getAPI();
  }
}
</script>
