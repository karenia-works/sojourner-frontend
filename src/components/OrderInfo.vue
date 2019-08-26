<template>
  <div class="orderInfo">
    <img :src="order.room.img" class="room_img" />
    <div class="info">
      <p class="room_title">{{order.room.name}}</p>
      <p class="room_city">@{{order.room.address.city}}</p>
      <p class="time"><span>from </span>{{order.startDate|dateStr}}<span> to </span>{{order.endDate|dateStr}}</p>
      <template v-if="order.isLongRent">
        <p class="room_price">${{order.room.longPrice}} per month</p>
      </template>
      <template v-else>
        <p class="room_price">${{order.room.shortPrice}} per night</p>
      </template>
      <span class="tag" v-if="order.isFinished">finished</span>
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
  object-fit: cover;
  border-radius: 3px;
  margin-right: 20px;
}

.info {
  height: 160px;
  position relative
}

p {
  margin: 0;
  text-align: left;
}

.finished {
  color colors.text-medium
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

.tag {
  padding 1px 5px
  color colors.bg-light
  background-color colors.accent
  text-transform: uppercase
  border-width 3px colors.accent solid
  border-radius 3px
  position absolute
  bottom 0
  left 0
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

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
}
</script>
