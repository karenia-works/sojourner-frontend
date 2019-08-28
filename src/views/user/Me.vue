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
import {Order} from '@/models/Room.ts'
import {Profile} from '@/models/Room.ts'


@Component({
  components: {
    Orders
  }
})
export default class Me extends Vue {

  profile: Profile = {
    userId: '456',
    userName: 'Skuld',
    email: 'sywang1207@gmail.com',
    phoneNumber: '13693680360',
    sex: 'F',
    avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1440019312,3309809430&fm=26&gp=0.jpg',
    signupDate: new Date("2019-8-25")
  };

  orders: Array<Order> = [
    {
      id: "789",
      roomId: "122",
      startDate: new Date("2019-8-20"),
      endDate: new Date("2019-10-20"),
      ddlDate: new Date("2019-9-20"),
      isFinished: false,
      isLongRent: true,
      totalPrice: 6000,
      room: {
        id: "122",
        name: "Amazing view - Moderne apartment",
        description: "",
        type: "quad",
        longAvailable: true,
        shortAvailable: true,
        longPrice: 3000,
        shortPrice: 156,
        img:
          ["https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large"],
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
      totalPrice: 1560,
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
      totalPrice: 3000,
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
      totalPrice: 6000,
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
      totalPrice: 1560,
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
  ];

}
</script>