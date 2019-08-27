<template>
  <div class="me">
    <div class="container">
      <h1>me</h1>
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
      startDate: new Date("2019-8-20"),
      endDate: new Date("2019-10-20"),
      ddlDate: new Date("2019-9-20"),
      isFinished: false,
      isLongRent: true,
      room: {
        id: "122",
        name: "Amazing view - Moderne apartment",
        type: "quad",
        longAvailable: true,
        shortAvailable: true,
        longPrice: 3000,
        shortPrice: 156,
        img:
          "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
        address: {
          city: "Akureyri",
          district: "Villa Lola"
        }
      }
    },
    {
      id: "788",
      startDate: new Date("2019-8-25"),
      endDate: new Date("2019-9-3"),
      isFinished: false,
      isLongRent: false,
      room: {
        id: "122",
        name: "Amazing view - Moderne apartment",
        type: "quad",
        longAvailable: true,
        shortAvailable: true,
        longPrice: 3000,
        shortPrice: 156,
        img:
          "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
        address: {
          city: "Akureyri",
          district: "Villa Lola"
        }
      }
    },
    {
      id: "787",
      startDate: new Date("2019-9-20"),
      endDate: new Date("2019-10-20"),
      isFinished: false,
      isLongRent: true,
      room: {
        id: "122",
        name: "Amazing view - Moderne apartment",
        type: "quad",
        longAvailable: true,
        shortAvailable: true,
        longPrice: 3000,
        shortPrice: 156,
        img:
          "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
        address: {
          city: "Akureyri",
          district: "Villa Lola"
        }
      }
    },
    {
      id: "786",
      startDate: new Date("2019-8-20"),
      endDate: new Date("2019-10-20"),
      isFinished: true,
      isLongRent: true,
      room: {
        id: "122",
        name: "Amazing view - Moderne apartment",
        type: "quad",
        longAvailable: true,
        shortAvailable: true,
        longPrice: 3000,
        shortPrice: 156,
        img:
          "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
        address: {
          city: "Akureyri",
          district: "Villa Lola"
        }
      }
    },
    {
      id: "785",
      startDate: new Date("2019-8-25"),
      endDate: new Date("2019-9-3"),
      isFinished: true,
      isLongRent: false,
      room: {
        id: "122",
        name: "Amazing view - Moderne apartment",
        type: "quad",
        longAvailable: true,
        shortAvailable: true,
        longPrice: 3000,
        shortPrice: 156,
        img:
          "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
        address: {
          city: "Akureyri",
          district: "Villa Lola"
        }
      }
    }
  ]

}
</script>