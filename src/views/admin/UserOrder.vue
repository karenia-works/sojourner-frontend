<template>
  <div class="container">
    <div class="text_label">
      <div class="issue_info">
        <label>
          UID:
          <label class="info">{{GetQueryString("uid")}}</label>
        </label>
      </div>
      <div class="refresh-btn">
        <button class="btn" @click="getAPI()">refresh</button>
      </div>
    </div>

    <table class="table" style="border-collapse: collapse;">
      <tr class="head">
        <td>OID</td>
        <td>Room Name</td>
        <!-- <td>Preview</td> -->
        <td>Lessee</td>
        <td>Duration</td>
        <td>Rent Type</td>
        <td>Total Price</td>
        <td>More</td>
      </tr>
      <tr class="layer" v-for="order in orders" :key="order.id">
        <td>{{ order.id.substr(order.id.length-4) }}</td>
        <td>{{ order.houseId}}</td>
        <!-- <td>
          <img :src="order.house.img[0]" class="ava_img" />
        </td> -->
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
  .text_label {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .issue_info {
      text-align: left;
      font-size: font-sizes.body-larger;
      font-weight: bold;
      line-height: 50px;

      .info {
        font-weight: normal;
      }
    }

    .refresh-btn {
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
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dotsIcon from "mdi-vue/DotsVertical";
import axios from "axios";
import { Order } from "@/models/Room";
import moment, { Moment } from "moment";
import { findOrderByRoom, findOrderByUser } from "@/helpers/orderHelper";

@Component({
  components: { dotsIcon }
})
export default class ReplyIssue extends Vue {
  orders: Order[] = [];
  uid: string = "";
  temp_id: string = "";

  origin_url = "https://sojourner.rynco.me/api/v1/order/orderList";
  api_url = "https://sojourner.rynco.me/api/v1/order/orderList";
  keyword = "";

  GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  stringToFormattedDate(str: string): string {
    return moment(str).format("MM-DD");
  }

  getDuration(startDate: string, endDate: string) {
    return (
      this.stringToFormattedDate(startDate) +
      "->" +
      this.stringToFormattedDate(endDate)
    );
  }

  async getAPI() {
    try {
      this.orders = await findOrderByUser(
        this.GetQueryString("uid") as string,
        this.$store.getters.authHeader
      );
    } catch (e) {
      console.log(e);
    }
  }

  mounted() {
    this.getAPI();
  }

  reRoute() {
    if (this.keyword == "") this.api_url = this.origin_url;
    else this.api_url = this.origin_url + "?kw=" + this.keyword;
    this.getAPI();
  }

  findOrderByRoom() {
    console.log(this.keyword);
    findOrderByRoom(this.keyword).then(orders => (this.orders = orders));
  }
}
</script>
