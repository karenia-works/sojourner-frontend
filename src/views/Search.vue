<template>
  <div class="search">
    <div class="container">
      <SearchBar class="SearchBar"></SearchBar>
      <RoomsInGrid :roomlist="rooms"></RoomsInGrid>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.SearchBar {
  margin: 20px 10px 30px
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RoomsInGrid from "@/components/RoomsInGrid.vue"; // @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";

@Component({
  components: {
    RoomsInGrid, 
    SearchBar
  }
})
export default class Search extends Vue {
  rooms = [
    {
      id: "122",
      title: "Amazing view - Moderne apartment",
      type: "quad",
      price: 156,
      img:
        "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
      address: {
        city: "akureyri"
      }
    },
    {
      id: "123",
      title: "Amazing view - Moderne apartment - Moderne apartment",
      type: "double",
      price: 156,
      img:
        "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large",
      address: {
        city: "akureyri"
      }
    },
    {
      id: "124",
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
      id: "125",
      title: "Amazing view - Moderne apartment - Moderne apartment",
      type: "quad",
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