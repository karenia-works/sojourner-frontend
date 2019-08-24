<template>
  <div class="roominfo">
    <img :src="roomInfo.img" class="room_img" />
    <p class="room_type">{{room_type}}</p>
    <span>-</span>
    <p class="room_city">{{roomInfo.address.city}}</p>
    <p class="room_title">{{roomInfo.title}}</p>
    <p class="room_price">${{roomInfo.price}} per night</p>
  </div>
</template>

<style lang="stylus" scoped>
.roominfo {
  width: 300px;
  // border: 1px red solid
  border-radius: 3px;
}

img {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 3px;
  margin-bottom: 10px;
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
  clear: both;
  margin-v: 10px;
}

.room_price {
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
export default class RoomInfo extends Vue {
  @Prop({  default: () => {} }) roomInfo!: any;

  // @Prop({ type: , default: "" }) placeholder!: string;
  // @Prop({ type: Object, default: null }) room!: Object;

  // room = {
  //   id: 123,
  //   title: "Amazing view - Moderne apartment - Moderne apartment",
  //   type: "quad",
  //   price: 156,
  //   img: "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
  //   address: {
  //     city: "akureyri"
  //   }
  // };

  get room_type(): string {
    var type = this.roomInfo.type;
    if (type === "single") return "1 bed";
    else if (type === "double") return "2 beds";
    else if (type === "quad") return "4 beds";
    else return "";
  }
}
</script>
