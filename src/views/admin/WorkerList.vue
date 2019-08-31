<template>
  <div class="container">
    <div class="add_worker">
      <router-link to="NewWorker">
        <button class="btn">Add Worker</button>
      </router-link>
    </div>
    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>WID</td>
        <td>Worker Name</td>
        <td>Phone Number</td>
        <td>Email</td>
        <td>Status</td>
        <td>More</td>
      </tr>
      <tr class="layer" v-for="(worker, index) in workers" :key="index">
        <td>{{ worker.id.substr(worker.id.length-4) }}</td>
        <td>{{ worker.userName }}</td>
        <td>{{ worker.phoneNumber }}</td>
        <td>{{ worker.email }}</td>
        <td>
          <label v-show="!worker.is_busy" class="yes_judge">Free</label>
          <label v-show="worker.is_busy" class="no_judge">Busy</label>
        </td>
        <td>
          <div class="dropdown">
            <button class="dropbtn">
              <dotsIcon />
            </button>
            <div class="dropdown-content">
              <router-link v-on:click.native="deleteAPI(worker.email)" to>Delete</router-link>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  .add_worker {
    float: right;
    height: 70px;
    padding-right: 30px;
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
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dotsIcon from "mdi-vue/DotsVertical";
import axios from "axios";
import { getProfileId } from "@/helpers/profileHelper";
import { Profile } from "@/models/Room";

@Component({
  components: { dotsIcon }
})
export default class ManagerWorker extends Vue {
  workers: Profile[] = [];

  origin_url = "https://sojourner.rynco.me/api/v1/profile/alluserlist/worker";
  api_url = "https://sojourner.rynco.me/api/v1/profile/alluserlist/worker";
  del_url = "https://sojourner.rynco.me/api/v1/profile/";

  getAPI() {
    axios
      .get(this.api_url, {
        headers: this.$store.getters.authHeader
      })
      .then(response => (this.workers = response.data))
      .catch(error => console.log(error));
  }

  async deleteAPI(delete_id: string) {
    try {
      await axios.delete(this.DeleteItem(delete_id), {
        headers: this.$store.getters.authHeader
      });
    } catch (e) {
      console.log(e);
    }
    // this.rooms.filter(x => x.id == delete_id);
    this.getAPI();
  }

  DeleteItem(delete_id: string) {
    return this.del_url + delete_id;
  }

  mounted() {
    this.getAPI();
  }
}
</script>
