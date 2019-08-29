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
      <tr class="layer" v-for="user in users">
        <td>
          <img :src="user.ava_url" class="ava_img" />
        </td>
        <td>{{ user.email }}</td>
        <td>{{ user.user_name }}</td>
        <td>{{ user.sex }}</td>
        <td>
          <label v-show="user.is_renting" class="yes_judge">Yes</label>
          <label v-show="!user.is_renting" class="no_judge">No</label>
        </td>
        <td>
          <div class="dropdown">
            <button class="dropbtn">
              <dotsIcon />
            </button>
            <div class="dropdown-content">
              <router-link to>Change Info</router-link>
              <router-link to>Check Order</router-link>
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
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dotsIcon from "mdi-vue/DotsVertical";
import searchbarAdmin from "@/components/SearchBarAdmin.vue";
import axios from "axios";

@Component({
  components: { dotsIcon, searchbarAdmin }
})
export default class ManageUser extends Vue {
  users = [];
  
  origin_url = "http://localhost:5000/api/v1/room";
  api_url = "http://localhost:5000/api/v1/room";
  keyword = "";

  getAPI() {
    axios
      .get(this.api_url)
      .then(response => (this.users = response.data))
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
