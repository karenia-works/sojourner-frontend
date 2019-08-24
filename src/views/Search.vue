<template>
  <div class="search">
    <div class="container">
      <h1>search result</h1>
      <room-info :room-info="room1" />
      <!-- <room-info 
        v-for="item in rooms" 
        :room="item"
        :key="item.id" 
      ></room-info>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RoomInfo from "@/components/RoomInfo.vue"; // @ is an alias to /src

@Component({
  components: {
    RoomInfo
  }
})
export default class Search extends Vue {
  get room1() {
    return {
      id: 123,
      title: "Amazing view - Moderne apartment - Moderne apartment",
      type: "quad",
      price: 156,
      img:
        "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
      address: {
        city: "akureyri"
      }
    };
  }

  rooms = [
    {
      id: 123,
      title: "Amazing view - Moderne apartment - Moderne apartment",
      type: "quad",
      price: 156,
      img:
        "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
      address: {
        city: "akureyri"
      }
    },
    {
      id: 124,
      title: "Amazing view - Moderne apartment - Moderne apartment",
      type: "single",
      price: 156,
      img:
        "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
      address: {
        city: "akureyri"
      }
    }
  ];
}
</script>
