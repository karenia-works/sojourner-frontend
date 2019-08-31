<template>
  <div class="orders">
    <template class="activeOrders">
      <OrderInfoA v-for="item in activeOrders" :order="item" :key="item.id"></OrderInfoA>
    </template>
    <div class="showBtn">
      <button class="btn" @click="toggleFinished">{{btnValue}} rent history</button>
    </div>
    <template  v-if="showFinished">
      <OrderInfoF v-for="item in finishedOrders" :order="item" :key="item.id"></OrderInfoF>
    </template>
  </div>
</template>

<style lang="stylus" scoped>
.orderInfo {
  margin-v spaces._6
}

.orderInfo.finished {
  margin-v spaces._5
}

.showBtn {
  margin-top spaces._5
  height 40px
  display flex
}

.showBtn button {
  margin-left 0
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import OrderInfoA from "@/views/user/OrderInfoA.vue"; // @ is an alias to /src
import OrderInfoF from "@/views/user/OrderInfoF.vue";
import {Order} from '@/models/Room.ts'
import axios from "axios";
import config from "@/config.ts";

@Component({
  components: {
    OrderInfoA,
    OrderInfoF
    }
})
export default class Orders extends Vue {
  // @Prop() orders!: Order[];
  // @Prop() orderlist!: Order[];
  // get orders(){return this.orderlist};

  orders: Order[] = [];
  activeOrders: Order[] = [];
  finishedOrders: Order[] = [];

  showFinished = false;

  get btnValue(): String {
    return this.showFinished ? 
      "Hide" : "Show";
  }

  // get finishedOrders(){

  // }

  toggleFinished() {
    this.showFinished = !this.showFinished;
  }

  async mounted() {
    await this.getOrders();
    // this.orders = this.orderlist;
    for (let i=0; i<this.orders.length; i++) {
      var order = this.orders[i];
      if (order.isFinished) {
        this.finishedOrders.push(order);
      } else {
        this.activeOrders.push(order);
      }
    }
  }
  
  async getOrders() {
    let response = await axios
      .get(config.backend.address + `order/me`, {
        headers: this.$store.getters.authHeader
      })
      // console.log(response)
      this.orders = response.data;
  }
}
</script>