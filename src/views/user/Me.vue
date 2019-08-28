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
    }
  ];

}
</script>