<template>
  <div class="orderInfo finished">
    <img :src="order.room.img" class="room_img" />
    <div class="info">
      <p class="room_title">
        {{order.room.address.district}} | 
        <span class="dark">{{order.room.address.city}}</span>
      </p>
      <p class="time">{{order.startDate|dateStr}} - 
        {{order.endDate|dateStr}}</p>
      <p class="detail">
        <span class="tag">{{rentType}} rent</span>
        <span>{{rentTime}}, </span>
        <span>${{order.totalPrice}}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment, { Moment } from "moment";
import {Order} from '@/models/Room.ts'

@Component({
  components: {
    // RoomsInGrid
  },
  filters: {
    dateStr: function(date: Date) {
      return moment(date).format('MMM Do, YYYY');
    } 
  }
})
export default class OrderInfo extends Vue {
  @Prop() item!: Order;
  order = this.item;
  rentType: String = this.order.isLongRent ? "long" : "short";
  get rentTime(): String {
    let start: Moment = moment(this.order.startDate);
    let end: Moment = moment(this.order.endDate);
    let length: number;
    if (this.order.isLongRent) {
      length = end.diff(start, 'month');
      return "" + length + 
      " month" + (length>1 ? "s" : "");
    } else {
      length = end.diff(start, 'day');
      return "" + (length+1) +
       " day" + (length>1 ? "s" : "");
    }
  }
}
</script>

<style lang="stylus" scoped>
.orderInfo {
  width 100%
  border-radius: 3px;
  color colors.text-medium
  display flex
  align-items: flex-end
}

.orderInfo:hover {
  cursor: pointer;
  background-color rgba(255, 255, 255, 0.5)
}

.dark {
  color colors.text-dark
}

img {
  width: 150px;
  height: 100px;
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
  margin-bottom: 10px;
}

.room_city {
  text-transform: uppercase;
}

.tag {
  padding 1px 5px
  margin-right 5px
  color colors.bg-light
  background-color colors.accent
  text-transform: uppercase
  font-size 14px
  border-width 2px colors.accent solid
  border-radius 3px
}
</style>
