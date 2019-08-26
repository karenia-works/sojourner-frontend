<template>
  <div class="results gridView">
    <roomInfo class v-for="item in rooms" :item="item" :key="item.id"></roomInfo>
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
import RoomInfo from "@/components/RoomInfo.vue";
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
