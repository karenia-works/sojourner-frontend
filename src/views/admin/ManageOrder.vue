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
        <td>Total Price</td>
        <td>More</td>
      </tr>
      <tr class="layer" v-for="order in orders" :key="order.id">
        <td>{{ order.id.substr(order.id.length-4)  }}</td>
        <td>{{ order.house.name}}</td>
        <td>
          <img :src="order.house.img[0]" class="ava_img" />
        </td>
        <td>{{ order.userEmail }}</td>
        <td>{{ getDuration(order.startDate, order.endDate) }}</td>
        <td>
          <label v-show="order.isLongRent" class="yes_judge">Long Rent</label>
          <label v-show="!order.isLongRent" class="no_judge">Short Rent</label>
        </td>
        <td>
          <label>${{ order.totalPrice }}</label>
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
import { Order } from '@/models/Room';
import moment, { Moment } from "moment";
import {findOrderByRoom} from "@/helpers/orderHelper"

@Component({
  components: { dotsIcon, searchbarAdmin, }
})
export default class Manageorder extends Vue {
  orders:Order[] = [];

  origin_url = "https://sojourner.rynco.me/api/v1/order/orderView";
  api_url = "https://sojourner.rynco.me/api/v1/order/orderView";
  keyword = "";

  stringToFormattedDate(str: string):string{
    return moment(str).format("MM-DD")
  }

  getDuration(startDate: string, endDate: string){
    return (this.stringToFormattedDate(startDate) + "->" + this.stringToFormattedDate(endDate))    
  }

  getAPI() {
    axios
      .get(this.api_url, {
        headers: this.$store.getters.authHeader
      })
      .then(response => {(this.orders = response.data); console.log(this.orders)})
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

  findOrderByRoom(){
    console.log(this.keyword)
    findOrderByRoom(this.keyword).then(orders=>this.orders=orders)
  }
}
</script>
