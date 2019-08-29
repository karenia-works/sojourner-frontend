<template>
  <div class="container">
    <div class="search-line">
      <input
        type="text"
        class="input"
        placeholder="Type in the order you would like to find"
        v-model.trim="keyword"
      />
      <button class="btn" @click="reRoute">Search</button>
    </div>
    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>OID</td>
        <td>Room Name</td>
        <td>Preview</td>
        <td>Lessee</td>
        <td>Duration</td>
        <td>Rent Type</td>
        <td>Price</td>
        <td>More</td>
      </tr>
      <tr class="layer" v-for="order in orders">
        <td>{{ order.oid }}</td>
        <td>{{ order.room_name }}</td>
        <td>
          <img :src="order.ava_url" class="ava_img" />
        </td>
        <td>{{ order.user_name }}</td>
        <td>{{ order.duration }}</td>
        <td>
          <label v-show="order.is_long_rent" class="yes_judge">Long Rent</label>
          <label v-show="!order.is_long_rent" class="no_judge">Short Rent</label>
        </td>
        <td>
          <label v-show="order.is_long_rent">${{ order.price }}/month</label>
          <label v-show="!order.is_long_rent">${{ order.price }}/day</label>
        </td>
        <td>
          <div class="dropdown">
            <button class="dropbtn">
              <dotsIcon />
            </button>
            <div class="dropdown-content">
              <router-link to>Delete</router-link>
              <router-link to>Change Info</router-link>
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
        color: var(--color-text-medium);
      }

      .no_judge {
        font-weight: bold;
        color: var(--color-accent);
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
export default class Manageorder extends Vue {
  orders = [];

  origin_url = "http://localhost:5000/api/v1/room";
  api_url = "http://localhost:5000/api/v1/room";
  keyword = "";

  getAPI() {
    axios
      .get(this.api_url)
      .then(response => (this.orders = response.data))
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
