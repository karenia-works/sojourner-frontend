<template>
  <div class="orders">
    <template class="activeOrders">
      <OrderInfoA v-for="item in activeOrders" :item="item" :key="item.id"></OrderInfoA>
    </template>
    <div class="showBtn">
      <button class="btn" @click="toggleFinished">{{btnValue}} finished orders</button>
    </div>
    <template  v-if="showFinished">
      <OrderInfoF v-for="item in finishedOrders" :item="item" :key="item.id" class="finished"></OrderInfoF>
    </template>
  </div>
</template>

<style lang="stylus" scoped>
.orderInfo {
  margin-v spaces._6
}

.showBtn {
  height 40px
}

button {
  float right
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import OrderInfoA from "@/components/OrderInfoA.vue"; // @ is an alias to /src
import OrderInfoF from "@/components/OrderInfoF.vue";
import {Order} from '@/models/Room.ts'


@Component({
  components: {
    OrderInfoA,
    OrderInfoF
    }
})
export default class Orders extends Vue {
  @Prop() orderlist!: Order[];
  orders = this.orderlist;
  
  activeOrders: Order[] = [];
  finishedOrders: Order[] = [];

  showFinished = false;
  btnValue = "Show";

  toggleFinished() {
    this.showFinished = !this.showFinished;
    if (this.showFinished) {
      this.btnValue = "Hide";
    } else {
      this.btnValue = "Show";
    }
  }

  mounted() {
    for (let i=0; i<this.orders.length; i++) {
      var order = this.orders[i];
      if (order.isFinished) {
        this.finishedOrders.push(order);
      } else {
        this.activeOrders.push(order);
      }
    }
  }
}
</script>