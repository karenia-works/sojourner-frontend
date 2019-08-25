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

  order1 = {
    id: "122",
    title: "Amazing view - Moderne apartment",
    type: "quad",
    price: 3000,
    startDate: new Date("2019-8-20"),
    endDate: new Date("2019-10-20"),
    isLongRent: true,
    img:
      "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
    address: {
      city: "akureyri"
    }
  };

  order2 = {
    id: "123",
    title: "Amazing view - Moderne apartment",
    type: "quad",
    price: 156,
    startDate: new Date("2019-8-20"),
    endDate: new Date("2019-8-24"),
    isLongRent: false,
    img:
      "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
    address: {
      city: "akureyri"
    }
  };
}
</script>