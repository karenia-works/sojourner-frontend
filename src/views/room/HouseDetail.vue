<template>
  <div class="houseDetail">
    <div class="houseBigPic">
      <img alt="housePic" v-for="pic in img" :src="pic.url" />
    </div>
    <div class="aboutHouse">
      <div class="container">
        <div class="houseInfo">
          <div class="titleWords">
            <h1 class="info">{{ houseName }}</h1>
          </div>
          <div class="advWords">
            <label v-for="item in introItems" class="info intro subtitle">
              {{ item.subtitle }}
              <label class="info intro">{{ item.intro_text}}</label>
            </label>
          </div>
          <hr align="center" width="100%" size="1" />
          <div class="iconPart">
            <div class="line">
              <div class="elemt">
                <wifi-icon class="icon" />
                <label class="info">Wi-Fi:</label>
                <label v-show="this.EquipJudge[0]" class="info yes_judge">Yes</label>
                <label v-show="!this.EquipJudge[0]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <dish-icon class="icon" />
                <label class="info">Breakfast:</label>
                <label v-show="this.EquipJudge[1]" class="info yes_judge">Yes</label>
                <label v-show="!this.EquipJudge[1]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <smoke-detector-icon class="icon" />
                <label class="info">Smoke Detector:</label>
                <label v-show="this.EquipJudge[2]" class="info yes_judge">Yes</label>
                <label v-show="!this.EquipJudge[2]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <tv-icon class="icon" />
                <label class="info">Television:</label>
                <label v-show="this.EquipJudge[3]" class="info yes_judge">Yes</label>
                <label v-show="!this.EquipJudge[3]" class="info no_judge">No</label>
              </div>
            </div>
            <div class="line">
              <div class="elemt">
                <washing-machine-icon class="icon" />
                <label class="info">Wash Machine:</label>
                <label v-show="this.EquipJudge[4]" class="info yes_judge">Yes</label>
                <label v-show="!this.EquipJudge[4]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <fridge-icon class="icon" />
                <label class="info">Fridge:</label>
                <label v-show="this.EquipJudge[5]" class="info yes_judge">Yes</label>
                <label v-show="!this.EquipJudge[5]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <microwave-icon class="icon" />
                <label class="info">Microwave:</label>
                <label v-show="this.EquipJudge[6]" class="info yes_judge">Yes</label>
                <label v-show="!this.EquipJudge[6]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <parking-icon class="icon" />
                <label class="info">Parking Space:</label>
                <label v-show="this.EquipJudge[7]" class="info yes_judge">Yes</label>
                <label v-show="!this.EquipJudge[7]" class="info no_judge">No</label>
              </div>
            </div>
          </div>
        </div>

        <div class="bookInfo">
          <label class="price">$ {{ price }} / Day</label>
          <br />
          <label class="book roomType">Date</label>
          <div id="date-select" class="date_pick">
            <date-picker
              :selected-date.sync="startDate"
              :selected-date-end="endDate"
              :is-selecting-date-end="false"
              :has-date-end="true"
            ></date-picker>
            <span>to</span>
            <date-picker
              :selected-date="startDate"
              :selected-date-end.sync="endDate"
              :is-selecting-date-end="true"
              :has-date-end="true"
            ></date-picker>
            <br />
          </div>
          <label class="book roomType">Room Type</label>
          <label class="book">{{ roomType }}</label>
          <div class="rent_button">
            <div class="long_rent">
              <router-link tag="a" target="_blank" to="longpay">
                <button id="rent-btn" class="btn rent-btn">Long Term Rent</button>
              </router-link>
            </div>
            <div class="short_rent">
              <router-link to="submit">
                <button id="rent-btn" class="btn rent-btn">Short Term Rent</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.houseBigPic img {
  height: 33vw
  // width :33vw
}

.houseBigPic {
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  width: 100%
  flex: 1
  overflow-x: scroll
  white-space: nowrap
}

// roll scroll
::-webkit-scrollbar {
  width: 0 !important
}

::-webkit-scrollbar {
  width: 0 !important
  height: 0
}

.aboutHouse {
  .houseInfo {
    display: flex
    align-items: stretch
    flex-direction: column
    align-items: flex-start
    lost-column: 2 / 3

    .info {
      padding: 5px
      display: flex
      align-items: stretch
      flex-direction: column
      align-items: flex-start
    }

    .intro {
      height: 50px
      font-weight: normal
    }

    .subtitle {
      font-weight: bolder
      padding-top: 30px
    }

    .titleWords {
      font-weight: bold
      text-transform: uppercase
      font-size: font-sizes.medium-title
      padding: 36px 0px 36px 0px
    }

    .iconPart {
      padding: 5px
      display: flex
      flex-direction: row
      align-items: center
      align-self: stretch

      .line {
        display: flex
        flex-direction: column
        // justify-content : center;
        // flex-direction: column;
        align-items: stretch
        align-self: stretch
        width: 50%

        .elemt {
          display: flex
          flex-direction: column
          align-items: center
          align-self: stretch
          flex-wrap: nowrap
          padding: 15px
        }
      }
    }
  }

  .bookInfo {
    display: flex
    position: sticky
    align-items: stretch
    flex-direction: column
    border-style: solid
    border-width: 1px
    lost-column: 1 / 3

    .price {
      align-self: flex-start
      font-weight: bolder
      font-size: font-sizes.medium-title
    }

    .date_pick {
      line-height: 30px
      font-size: font-sizes.body_larger
      flex-direction: column
    }

    .rent_button {
      display: flex
      flex-direction: row
      justify-content: center
      padding-top: 30px

      .rent-btn {
        font-size: font-sizes.body-larger
      }
    }
  }
}

.book {
  font-size: font-sizes.body-larger
}

.roomType {
  font-weight: bold
}

.yes_judge {
  font-weight: bolder
  color: green
}

.no_judge {
  font-weight: bolder
  color: colors.error
}
</style>


<script lang="ts">
import { Component, Emit, Vue, Prop, Model } from "vue-property-decorator";
import wifiIcon from "mdi-vue/Wifi"; // works without an extension too
import dishIcon from "mdi-vue/SilverwareForkKnife";
import smokeDetectorIcon from "mdi-vue/SmokeDetector";
import tvIcon from "mdi-vue/TelevisionClassic";
import washingMachineIcon from "mdi-vue/WashingMachine";
import fridgeIcon from "mdi-vue/FridgeBottom";
import microwaveIcon from "mdi-vue/Microwave";
import parkingIcon from "mdi-vue/Parking";
import DatePicker from "@/components/DatePicker.vue";
import moment, { Moment } from "moment";
import { Room } from "@/models/Room.ts";

@Component({
  components: {
    wifiIcon,
    dishIcon,
    smokeDetectorIcon,
    tvIcon,
    washingMachineIcon,
    fridgeIcon,
    microwaveIcon,
    parkingIcon,
    DatePicker
  }
})
export default class HouseDetail extends Vue {
  @Prop({ default: () => moment(), type: moment }) initialStartDate!: Moment;
  @Prop({ default: () => moment(), type: moment }) initialEndDate!: Moment;
  @Prop({ default: () => "", type: String }) initialSearchStr: string = "";

  EquipJudge = [false, true, true, false, true, false, true, true];

  room: Room | undefined;

  startDate: Moment = this.initialStartDate;
  endDate: Moment = this.initialEndDate;
  searchStr: string = this.initialSearchStr;

  startDateValid: boolean = true;
  endDateValid: boolean = true;

  houseName = "Xueyuanlu 37tg";

  // date = moment(this.startDate).format("YYYY-MM-DD");

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  @Emit("search")
  emitSearch() {
    console.log(
      "",
      this.startDate.toString(),
      this.endDate.toString(),
      this.searchStr
    );
    return new SearchEvent(this.searchStr, this.startDate, this.endDate);
  }
}
export class SearchEvent {
  constructor(
    public searchStr: string,
    public startDate: Moment,
    public endDate: Moment
  ) {}
}
</script>
