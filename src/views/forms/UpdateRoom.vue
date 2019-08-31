<template>
  <div class="container">
    <div class="newRoom">
      <h1>update room</h1>
      <div class="form">
        <div class="item">
          <label for="name">Room name</label>
          <input type="text" class="input" id="name" placeholder="room name" v-model.trim="r.name" />
        </div>

        <div class="item">
          <label for="city">Address</label>
          <input
            type="text" class="input" id="country"
            placeholder="country"
            v-model.trim="r.address.country"
          />
          <input
            type="text" class="input" id="city"
            placeholder="city"
            v-model.trim="r.address.city"
          />
          <input
            type="text" class="input" id="street"
            placeholder="street"
            v-model.trim="r.address.street"
          />
        </div>

        <div class="item">
          <label for="description">Description</label>
          <textarea
            type="text" class="input"
            id="description"
            placeholder="description"
            rows="5"
            v-model.trim="r.description"
          />
        </div>

        <div class="file-selection">
          <label for="description">Photos</label>
          <file-selection @upload="uploadImg" :selectedFiles.sync="files" :showUpload="false"></file-selection>
        </div>

        <div class="item type">
          <label>Room type</label>
          <Radio :values="types" 
          :texts="['single', 'double', 'quad']" 
          :roomType.sync="r.type"></Radio>
        </div>

        <div class="item term">
          <label>Rent term</label>
          <div class="checks">
            <Checkbox
              :cId="'isLong'" :cText="'by month'"
              :picked.sync="r.longAvailable"
              class="checkbox"
            ></Checkbox>
            <Checkbox
              :cId="'isShort'" :cText="'by day'"
              :picked.sync="r.shortAvailable"
              class="checkbox"
            ></Checkbox>
          </div>
        </div>

        <div class="item price" v-if="r.longAvailable || r.shortAvailable">
          <label>Price</label>
          <div class="subitem" v-if="r.longAvailable">
            <label for="longPrice">long rent price</label>
            <input
              type="number"
              class="input"
              id="longPrice"
              placeholder="$ per month"
              v-model.number="r.longPrice"
            />
          </div>

          <div class="subitem" v-if="r.shortAvailable">
            <label for="shortPrice">short rent price</label>
            <input
              type="number"
              class="input"
              id="shortPrice"
              placeholder="$ per day"
              v-model.number="r.shortPrice"
            />
          </div>
        </div>

        <div class="item equip">
          <label>Equipments</label>
          <div class="checks">
            <Checkbox
              v-for="(item, index) in equips"
              :key="index"
              :cId="'eq'+index"
              :cText="item"
              :picked.sync="r.equipJudge[index]"
              class="checkbox"
            ></Checkbox>
          </div>
        </div>

        <div class="item notice">
          <label>Notices</label>
          <div class="checks">
            <Checkbox
              v-for="(item, index) in notices"
              :key="index"
              :cId="'nt'+index"
              :cText="item"
              :picked.sync="r.noticeJudge[index]"
              class="checkbox"
            ></Checkbox>
          </div>
        </div>
      </div>
      <button class="btn" @click="commit">confirm</button>
      <div class="error">{{commitError}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import { Room } from "@/models/Room.ts";
import Checkbox from "@/components/Checkbox.vue";
import Radio from "@/components/Radio.vue";
import FileSelection from "@/components/FileSelection.vue";
import config from "@/config.ts";
import axios from "axios";
import { uploadImages } from "@/helpers/uploadHelper";

@Component({
  components: {
    Checkbox,
    Radio,
    FileSelection
  }
})
export default class UpdateRoom extends Vue {
  @Prop() room!: Room;
  r: Room = this.room;
  
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
  ];

  files: Array<File> = [];

  async uploadImg(files: File[]) {
    if (this.r) {
      let fileNames = await uploadImages(files);
      let fileLinks = fileNames.map(
        name => `https://sojourner.rynco.me/api/v1/image/${name}`
      );
      this.r.img = fileLinks;
    }
  }

  commitError: string | null = null;

  async commit() {
    if (this.r) {
      await this.uploadImg(this.files);
      try {
        let result = await axios.put(
          config.backend.address + 'room/' + this.r.id,
          this.r,
          { headers: this.$store.getters.authHeader }
        );

        let success = result.status == 201;
        alert('update successfully');
        this.$router.push({ name: "adminRoom" });
      } catch (e) {
        this.commitError = e;
      }
    }
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
  font-weight 500
}

textarea {
  width 400px
}

.input {
  margin-left: 0
}

.type label {
  margin-bottom: spaces._3rom
}

.term label,
.term .checks,
.term .checkbox {
  display: inline-block
}

.term .checks .checkbox {
  margin-left: spaces._3
}

.price .subitem {
  display: flex
  align-items: flex-end
}

.price .subitem label {
  font-size: font-sizes.body-larger
  margin-right: spaces._3
}

.equip .checks,
.notice .checks {
  width: 100%
  // width 500px
  display: flex
  flex-wrap: wrap
}

.equip .checks .checkbox,
.notice .checks .checkbox {
  width: 150px
  lost-column: 1 / 4
  margin-v: spaces._1
}
</style>
