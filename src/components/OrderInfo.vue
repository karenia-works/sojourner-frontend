<template>
  <div class="orderInfo" :class="{finished: finished}" >
    <img :src="order.img" class="room_img" />
    <div class="info">
      <p class="room_title">{{order.title}}</p>
      <p class="room_city">{{order.address.city}}</p>
      <template v-if="order.isLongRent">
        <p class="room_price">${{order.price}} per month</p>
      </template>
      <template v-else>
        <p class="room_price">${{order.price}} per night</p>
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
}

.orderInfo:hover {
  cursor: pointer;
  background-color rgba(255, 255, 255, 0.5)
  position relative
  left 2px
  bottom 2px

}

img {
  width: 240px;
  height: 160px;
  object-fit: cover;
  border-radius: 3px;
  margin-right : 10px;
}

.info {
  // float left
}

p {
  margin: 0;
  padding: 0;
  text-align: left;
}

span {
  margin-h: 5px;
  margin-v: 0;
  padding: 0;
}

.room_type, .room_city, span {
  text-transform: uppercase;
  color: colors.text-medium;
  display: inline-block;
  float: left;
}

.room_title {
  font-weight: 500;
  font-family: fonts-title;
  font-size: font-sizes.small-title;
  clear: right 
  margin-v: 10px;
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

  get finished(): boolean {
    var today = new Date();
    var ddl = this.order.endDate;
    ddl.setHours(23);
    ddl.setMinutes(59);
    ddl.setSeconds(59);
    if (today > ddl) {
      return true;
    } else {
      return false;
    }
  }

}
</script>
