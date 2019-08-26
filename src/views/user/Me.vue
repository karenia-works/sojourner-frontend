<template>
  <div class="me">
    <div class="container">
      <Orders :orderlist="orders"></Orders>
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
import Orders from "@/views/user/Orders.vue";


@Component({
  components: {
    Orders
  }
})
export default class Me extends Vue {

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

}
</script>