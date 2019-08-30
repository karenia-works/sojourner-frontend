<template>
  <div class="container">
    <div class="newRoom">
      <h1>new room</h1>
      <div class="form">
        <div class="item">
          <label for="name">Pick a good <span>name</span> for your room.</label>
          <input type="text" class="input" id="name" placeholder="room name" v-model.trim="r.name" />
        </div>

        <div class="item">
          <label for="city">Where is your room <span>located</span>?</label>
          <input type="text" class="input" id="country" placeholder="country" v-model.trim="r.address.country" />
          <input type="text" class="input" id="city" placeholder="city" v-model.trim="r.address.city" />
          <input type="text" class="input" id="street" placeholder="street" v-model.trim="r.address.street" />
        </div>

        <div class="item">
          <label for="description">How about giving a more detailed <span>description</span> to it?</label>
          <textarea 
          type="text" class="input" id="description" 
          placeholder="description" rows="3"
          v-model.trim="r.description" />
        </div>

        <div class="item type">
          <label>How many <span>beds</span> can be offered?</label>
          <Radio :values="types" :texts="['1', '2', '4']" :roomType.sync="r.type"></Radio>
        </div>

        <div class="item term">
          <label>You'd like to rent your room </label>
          <div class="checks">
            <Checkbox :cId="'isLong'" :cText="'by month'"
            :picked.sync="r.longAvailable" class="checkbox"></Checkbox>
            <Checkbox :cId="'isShort'" :cText="'by day'" 
            :picked.sync="r.shortAvailable" class="checkbox"></Checkbox>
          </div>
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
          <label>You can provide...</label>
          <div class="checks">
            <Checkbox 
              v-for="(item, index) in equips"
              :key="index" :cId="'eq'+index" 
              :cText="item" 
              :picked.sync="r.equipJudge[index]"
              class="checkbox"
            ></Checkbox>          
          </div>
        </div>

        <div class="item notice">
          <label>The tenants should be noticed that...</label>
          <div class="checks">
            <Checkbox 
              v-for="(item, index) in notices"
              :key="index" :cId="'nt'+index" 
              :cText="item" 
              :picked.sync="r.noticeJudge[index]"
              class="checkbox"
            ></Checkbox>          
          </div>
        </div>
      </div>
      <button class="btn" @click="commit">finish</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import {Room} from "@/models/Room.ts";
import Checkbox from "@/components/Checkbox.vue";
import Radio from "@/components/Radio.vue";
import config from "@/config.ts"
import axios from 'axios';

@Component({
  components: {
    Checkbox,
    Radio
  }
})
export default class NewRoom extends Vue{
  checked: boolean=false;

  types: Array<string> = ["single", "double", "quad"];
  equips: Array<string> = [
    "Wi-Fi",
    "breakfast",
    "somke detector",
    "television",
    "wash machine",
    "fridge",
    "microwave",
    "parking lot"
  ];
  notices: Array<string> = [
    "No Smoking",
    "No Pets",
    "No Noise",
    "No Photographs",
    "No Games"
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
      country: "",
      city: "",
      street: ""
    },
    img: [],
    equipJudge: [false, false, false, false, false, false, false, false],
    noticeJudge: [false, false, false, false, false]
  }

  async commit(){
    let result = await axios.post(
      config.backend.address+config.backend.roomEndpoint,
      this.r

    )

    let success = result.status == 201
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

.input {
  margin-left 0
}

.type label {
  margin-bottom spaces._3rom
}

.term label, .term .checks, .term .checkbox {
  display inline-block
}

.term .checks .checkbox {
  margin-left spaces._3
}

.price .subitem {
  display flex
  align-items flex-end
}

.price .subitem label {
  font-size font-sizes.body-larger
  margin-right spaces._3
}

.equip .checks, .notice .checks {
  width 100%
  // width 500px
  display flex
  flex-wrap wrap
}

.equip .checks .checkbox, .notice .checks .checkbox {
  width 150px
  lost-column: 1/4;
  margin-v spaces._1
}
</style>