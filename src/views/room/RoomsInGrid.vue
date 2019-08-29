<template>
  <div class="results gridView">
    <roomInfo class v-for="item in rooms" :room="item" :key="item.id"></roomInfo>
  </div>
</template>

<style lang="stylus" scoped>
.roominfo {
  margin-bottom: 50px
  margin-h: 10px
  float: left
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RoomInfo from "@/views/room/RoomInfo.vue";
import { Room } from "@/models/Room";

@Component({
  components: {
    RoomInfo
  }
})
export default class Search extends Vue {
  @Prop() roomlist!: Room[];
  rooms = this.roomlist;
}
</script>
