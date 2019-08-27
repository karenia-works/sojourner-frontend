<template>
  <div class="roominfo" @click="toDetail">
    <img :src="room.img" class="room_img" />
    <p class="room_type">{{room_type}}</p>
    <span>-</span>
    <p class="room_city">{{room.address.city}}</p>
    <p class="room_title">{{room.title}}</p>
    <p class="room_price">${{room.price}} per night</p>
  </div>
</template>

<style lang="stylus" scoped>
.roominfo {
  width: 300px
  // border: 1px red solid
  border-radius: 3px
}

.roominfo:hover {
  cursor: pointer
}

img {
  width: 300px
  height: 200px
  object-fit: cover
  border-radius: 3px
  margin-bottom: 10px
}

p {
  margin: 0
  padding: 0
  text-align: left
}

span {
  margin-h: 5px
  margin-v: 0
  padding: 0
}

.room_type,
.room_city,
span {
  text-transform: uppercase
  color: var(--color-text-medium)
  display: inline-block
  float: left
}

.room_title {
  font-weight: 500
  font-family: fonts-title
  font-size: font-sizes.small-title
  clear: both
  margin-v: 10px
}

.room_price {
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Room } from "@/models/Room";

@Component
export default class RoomInfo extends Vue {
  @Prop() item!: Room;
  room = this.item;

  get room_type(): string {
    var type = this.room.type;
    if (type === "single") return "1 bed";
    else if (type === "dual") return "2 beds";
    else if (type === "quad") return "4 beds";
    else return "";
  }

  toDetail() {
    this.$router.push({ name: "room_detail", params: { id: this.item.id } });
  }
}
</script>
