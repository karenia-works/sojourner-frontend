<template>
  <div class="container">
    <div class="newRoom">
      <h1>new room</h1>
        <div class="item">
          <label for="name">Pick a good <span>name</span> for your room.</label>
          <input type="text" class="input" id="name" placeholder="room name" v-model.trim="r.name" />
        </div>

        <div class="item">
          <label for="city">Where is your room <span>located</span>?</label>
          <input type="text" class="input" id="city" placeholder="city" v-model.trim="r.address.city" />
          <input type="text" class="input" id="district" placeholder="street" v-model.trim="r.address.district" />
        </div>

        <div class="item">
          <label for="description">How about giving a more detailed <span>description</span> to it?</label>
          <textarea 
          type="text" class="input" id="description" 
          placeholder="description" rows="3"
          v-model.trim="r.description" />
        </div>

        <div class="item">
          <label>How many <span>beds</span> can be offered?</label>
          <div class="subitem">
            <input type="radio" id="single" value="single" v-model="r.type" style="color: red">
            <label for="single">1</label>
          </div>
          <div class="subitem">
            <input type="radio" id="double" value="double" v-model="r.type">
            <label for="double">2</label>
          </div>
          <div class="subitem">
            <input type="radio" id="quad" value="quad" v-model="r.type">
            <label for="quad">4</label>
          </div>
        </div>

        <div class="item">
          <label>You'd like to rent your room...</label>
          <Checkbox :cId="'isLong'" :cText="'by month'" :picked.sync="r.longAvailable"></Checkbox>
          <Checkbox :cId="'isShort'" :cText="'by day'" :picked.sync="r.shortAvailable"></Checkbox>
        </div>

        <div class="item price" v-if="r.longAvailable || r.shortAvailable">
          <label>How much would you like to <span>charge</span>?</label>
          <div class="subitem" v-if="r.longAvailable">
            <label for="longPrice">long rent price</label>
            <input type="number" class="input" id="longPrice" placeholder="$ per month" v-model.number="r.longPrice" />
          </div>

          <div class="subitem" v-if="r.shortAvailable">
            <label for="shortPrice">short rent price</label>
            <input type="number" class="input" id="shortPrice" placeholder="$ per day" v-model.number="r.shortPrice" />
          </div>
        </div>

        <div class="item equip">
          <label>equipJudge</label>
          {{r.equipJedge}}          
          <Checkbox :cId="'eq0'" :cText="equips[0]" :picked.sync="r.equipJudge[0]"></Checkbox>
          <Checkbox :cId="'eq1'" :cText="equips[1]" :picked.sync="r.equipJudge[1]"></Checkbox>
          <Checkbox :cId="'eq2'" :cText="equips[2]" :picked.sync="r.equipJudge[2]"></Checkbox>
          <Checkbox :cId="'eq3'" :cText="equips[3]" :picked.sync="r.equipJudge[3]"></Checkbox>
          <Checkbox :cId="'eq4'" :cText="equips[4]" :picked.sync="r.equipJudge[4]"></Checkbox>
          <Checkbox :cId="'eq5'" :cText="equips[5]" :picked.sync="r.equipJudge[5]"></Checkbox>
          <Checkbox :cId="'eq6'" :cText="equips[6]" :picked.sync="r.equipJudge[6]"></Checkbox>
          <Checkbox :cId="'eq7'" :cText="equips[7]" :picked.sync="r.equipJudge[7]"></Checkbox>
          
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import {Room} from "@/models/Room.ts"
import Checkbox from "@/components/Checkbox.vue"

@Component({
  components: {
    Checkbox
  }
})
export default class NewRoom extends Vue{
  checked: boolean=false;

  equips: Array<string> = [
    "Wi-Fi",
    "breakfast",
    "somke detector",
    "television",
    "wash machine",
    "fridge",
    "microwave",
    "parking lot"
  ]

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
.item {
  margin-v spaces._6
}

label:first-child {
  display block
  font-size font-sizes.small-title
  font-family fonts-title
}

label:first-child span {
  // color colors-admin.accent
  font-weight 500
}

textarea {
  width 400px
}

.subitem label {
  display inline-block
}

input[type=checkbox], input[type=radio] {
  display none
}

input:checked+label {
  color red
}

.input {
  margin-left 0
}

</style>