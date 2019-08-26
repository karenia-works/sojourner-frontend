<template>
  <div class="orderInfo" :class="{finished: order.finished}" >
    <img :src="order.room.img" class="room_img" />
    <div class="info">
      <p class="room_title">{{order.room.name}}</p>
      <p class="room_city">@{{order.room.address.city}}</p>
      <p class="time"><span>from </span>{{order.startDate|dateStr}}<span> to </span>{{order.endDate|dateStr}}</p>
      <template v-if="order.isLongRent">
        <p class="room_price">${{order.room.price}} per month</p>
      </template>
      <template v-else>
        <p class="room_price">${{order.room.price}} per night</p>
      </template>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.orderInfo {
  width 100%
  // border: 1px red solid
  border-radius: 3px;
  display flex
  align-items: flex-start
}

.orderInfo:hover {
  cursor: pointer;
  background-color rgba(255, 255, 255, 0.5)
}

img {
  width: 240px;
  height: 160px;
  object-fit: cover;
  border-radius: 3px;
  margin-right: 20px;
}

p {
  margin: 0;
  text-align: left;
}

.room_title {
  font-weight: 500;
  font-family: fonts-title;
  font-size: font-sizes.small-title;
  clear: right 
  margin-bottom: 5px;
}

.room_city {
  text-transform: uppercase;
  color: colors.text-medium;
}

.time span {
  color colors.text-medium
}


.room_price {
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

// interface order {
//   id: string;
//   title: string;
//   type: string;
//   price: number;
//   img: string;
//   address: object;
// }

@Component({
  components: {
    // RoomsInGrid
  },
  filters: {
    dateStr: function(date: Date) {
      return "" + 
        (date.getFullYear() % 100) + "/"  + (date.getMonth() + 1) + "/"  + 
        (date.getDate() + 1);
    }
  }
})
export default class OrderInfo extends Vue {
  @Prop() item!: Object;
  order = this.item;

  // get finished(): boolean {
  //   var today = new Date();
  //   var ddl = this.order.endDate;
  //   ddl.setHours(23);
  //   ddl.setMinutes(59);
  //   ddl.setSeconds(59);
  //   if (today > ddl) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

}
</script>
