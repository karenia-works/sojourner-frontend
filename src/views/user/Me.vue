<template>
  <div class="me">
    <div class="container">
      <userInfo class="userInfo" :item="profile"></userInfo>
      <Orders :orderlist="orders"></Orders>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  display flex
  flex-direction column
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Orders from "@/views/user/Orders.vue";
import UserInfo from "@/views/user/UserInfo.vue";
import {Order} from '@/models/Room.ts'
import {Profile} from '@/models/Room.ts'


@Component({
  components: {
    Orders,
    UserInfo
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
      houseId: "122",
      userId: "122",
      startDate: new Date("2019-8-20"),
      endDate: new Date("2019-10-20"),
      ddlDate: new Date("2019-9-20"),
      isFinished: false,
      isLongRent: true,
      totalPrice: 6000,
      createDate: new Date("2019-8-18"),  
      cancelDate: undefined,
      isPaid: false
    },
    {
      id: "788",
      houseId: "122",
      userId: "122",
      startDate: new Date("2019-8-20"),
      endDate: new Date("2019-8-30"),
      ddlDate: undefined,
      isFinished: false,
      isLongRent: false,
      totalPrice: 1560,
      createDate: new Date("2019-8-18"),  
      cancelDate: undefined,
      isPaid: false
    },
    {
      id: "787",
      houseId: "122",
      userId: "122",
      startDate: new Date("2019-9-20"),
      endDate: new Date("2019-10-20"),
      ddlDate: new Date("2019-10-20"),
      isFinished: false,
      isLongRent: true,
      totalPrice: 6000,
      createDate: new Date("2019-8-18"),  
      cancelDate: undefined,
      isPaid: false
    },
    {
      id: "786",
      houseId: "122",
      userId: "122",
      startDate: new Date("2019-7-20"),
      endDate: new Date("2019-8-20"),
      ddlDate: new Date("2019-8-20"),
      isFinished: true,
      isLongRent: true,
      totalPrice: 6000,
      createDate: new Date("2019-7-18"),  
      cancelDate: undefined,
      isPaid: false
    }
  ];

}
</script>