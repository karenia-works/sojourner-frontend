<template>
  <div class="container">
    <div class="newRoom">
      <h1>new room</h1>
        <div class="item">
          <label for="name">name</label>
          <input type="text" class="input" id="name" placeholder="room name" v-model.trim="r.name" />
        </div>

        <div class="item">
          <label for="name">address</label>
          <input type="text" class="input" id="city" placeholder="city" v-model.trim="r.address.city" />
          <input type="text" class="input" id="district" placeholder="street" v-model.trim="r.address.district" />
        </div>

        <div class="item">
          <label for="description">description</label>
          <textarea type="text" class="input" id="description" placeholder="description" v-model.trim="r.description" />
        </div>

        <div class="item">
          <label>room type</label>
          <div class="subitem">
            <input type="radio" id="single" value="single" v-model="r.type">
            <label for="single">single</label>
          </div>
          <div class="subitem">
            <input type="radio" id="double" value="double" v-model="r.type">
            <label for="double">double</label>
          </div>
          <div class="subitem">
            <input type="radio" id="quad" value="quad" v-model="r.type">
            <label for="quad">quad</label>
          </div>
        </div>

        <div class="item">
          <label>rent for</label>
          <div class="subitem">
            <input type="checkbox" id="isLong" v-model="r.longAvailable">
            <label for="isLong">long term rent</label>
          </div>
          <div class="subitem">
            <input type="checkbox" id="isShort" v-model="r.shortAvailable">
            <label for="isShort">short term rent</label>
          </div>
        </div>

        <div class="item" v-if="r.longAvailable">
          <label for="longPrice">long rent price</label>
          <input type="number" class="input" id="longPrice" placeholder="price per month" v-model.number="r.longPrice" />
        </div>

        <div class="item" v-if="r.shortAvailable">
          <label for="shortPrice">short rent price</label>
          <input type="number" class="input" id="shortPrice" placeholder="price per day" v-model.number="r.shortPrice" />
        </div>

        <div class="item">
          <label>equipJudge</label>
          {{r.equipJedge}}
          <div class="subitem">
            <input type="checkbox" id="" v-model="r.equipJudge[0]">
            <label for="">short term rent</label>
          </div>
          <div class="subitem">
            <input type="checkbox" id="" v-model="r.equipJudge[1]">
            <label for="">short term rent</label>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {Room} from "@/models/Room.ts"

@Component({})
export default class NewRoom extends Vue{
  checked: boolean=false;
  r: Room = { 
    id: "",
    name: "",
    description: "",
    type: "single",
    longAvailable: false,
    shortAvailable: false,
    longPrice: undefined,
    shortPrice: undefined,
    address: {
      city: "",
      district: ""
    },
    img: [],
    equipJudge: [false, false, false, false, false, false, false, false],
    noticeJudge: [false, false, false, false, false]
  }
}
</script>

<style lang="stylus" scoped>

</style>