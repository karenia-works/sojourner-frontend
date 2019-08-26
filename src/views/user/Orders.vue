<template>
  <div class="orders">
    <div class="container">
        <OrderInfo :item="order1"></OrderInfo>
        <OrderInfo :item="order2"></OrderInfo>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.orderInfo {
  margin-v spaces._6
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
      finished: false,
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

  activeOrders = [];
  finishedOrders = [];
  
  mounted() {
    for (let i=0; i<this.orders.length; i++) {
      var order = this.orders[i];
      if (order.finished) {
        this.finishedOrders.push(order);
      } else {
        this.finishedOrders.push(order);
      }
    }
  }
  
}
</script>