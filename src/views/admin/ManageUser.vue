<template>
  <div class="container">
    <div class="search-line">
      <input
        type="text"
        class="input"
        placeholder="Type in the user you would like to find"
        v-model.trim="keyword"
      />
      <button class="btn" @click="reRoute">Search</button>
    </div>
    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>Avatar</td>
        <td>E-mail</td>
        <td>User Name</td>
        <td>Gender</td>
        <td>is Renting</td>
        <td>More</td>
      </tr>
      <tr class="layer" v-for="(user,index) in users" :key="index">
        <td>
          <img :src="user.avatar" class="ava_img" />
        </td>
        <td>{{ user.email }}</td>
        <td>{{ user.userName }}</td>
        <td>{{ user.sex }}</td>
        <td>
          <label v-show="user.isRenting" class="yes_judge">Yes</label>
          <label v-show="!user.isRenting" class="no_judge">No</label>
        </td>
        <td>
          <UpdateUser :user="user" :show.sync="showUpdate"></UpdateUser>
          <div class="dropdown">
            <button class="dropbtn">
              <dotsIcon />
            </button>
            <div class="dropdown-content">
              <router-link to v-on:click.native="OpenUpdate()">Change Info</router-link>
              <router-link :to="getUserOrderUrl(user.email)">Check Order</router-link>
              <router-link v-on:click.native="deleteAPI(user.email)" to>Delete</router-link>
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
      lost-column: 10 / 12;
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
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dotsIcon from "mdi-vue/DotsVertical";
import searchbarAdmin from "@/components/SearchBarAdmin.vue";
import axios from "axios";
import { getProfileId } from "@/helpers/profileHelper";
import { Profile } from "@/models/Room";
import UpdateUser from "@/views/forms/UpdateUser.vue"

@Component({
  components: { dotsIcon, searchbarAdmin, UpdateUser }
})
export default class ManageUser extends Vue {
  users: Profile[] = [];

  origin_url = "https://sojourner.rynco.me/api/v1/profile/alluserlist/all";
  api_url = "https://sojourner.rynco.me/api/v1/profile/alluserlist/all";
  del_url = "https://sojourner.rynco.me/api/v1/profile/";
  keyword = "";

  getAPI() {
    console.log(this.$store.getters.authHeader);
    axios
      .get(this.api_url, {
        headers: this.$store.getters.authHeader
      })
      .then(response => (this.users = response.data))
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

  mounted() {
    this.getAPI();
  }

  async reRoute() {
    if (this.keyword != "")
      try {
        this.users = [];
        this.users.push(
          await getProfileId(this.keyword, this.$store.getters.authHeader)
        );
      } catch (e) {
        console.log(e);
      }
    else this.getAPI();
  }

  DeleteItem(delete_id: string) {
    return this.del_url + delete_id;
  }

  getUserOrderUrl(uid: number) {
    return "UserOrder?uid=" + uid;
  }

  showUpdate: boolean = false;
  OpenUpdate() {
    this.showUpdate = true;
  }
}
</script>
