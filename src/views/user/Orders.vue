<template>
  <div class="orders">
    <div class="container">
      <div class="showBtn">
        <button class="btn" @click="toggleFinished">{{btnValue}} finished orders</button>
      </div>
      <template class="activeOrders">
        <OrderInfo v-for="item in activeOrders" :item="item" :key="item.id"></OrderInfo>
      </template>
      <template  v-if="showFinished">
        <OrderInfo v-for="item in finishedOrders" :item="item" :key="item.id" class="finished"></OrderInfo>
      </template>
    </div>
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
// import RoomsInGrid from "@/components/RoomsInGrid.vue"; // @ is an alias to /src
import OrderInfo from "@/components/OrderInfo.vue";


@Component({
  components: {
    OrderInfo
  }
})
export default class Orders extends Vue {
  activeOrders = [];
  finishedOrders = [];

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

  orders = [
    {
      id: "789",
      finished: false,
      startDate: new Date("2019-8-20"),
      endDate: new Date("2019-10-20"),
      isLongRent: true,
      room: {
        id: "122",
        name: "Amazing view - Moderne apartment",
        type: "quad",
        price: 3000,
        img:
          "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
        address: {
          city: "akureyri"
        }
      }
    },
    {
      id: "788",
      finished: true,
      startDate: new Date("2019-8-15"),
      endDate: new Date("2019-8-19"),
      isLongRent: false,
      room: {
        id: "122",
        name: "Amazing view - Moderne apartment",
        type: "quad",
        price: 156,
        img:
          "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
        address: {
          city: "akureyri"
        }
      }
    }
  ]

  
  mounted() {
    for (let i=0; i<this.orders.length; i++) {
      var order = this.orders[i];
      if (order.finished) {
        this.finishedOrders.push(order);
      } else {
        this.activeOrders.push(order);
      }
    }
  }
  
}
</script>