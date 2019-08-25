<template>
  <div class="houseDetail">
    <div class="houseBigPic">
      <img alt="housePic" v-for="pic in img1" :src="pic.url" />
    </div>
    <div class="container">
      <section class="aboutHouse">
        <div class="houseInfo">
          <div class="titleWords">
            <label class="info">{{ house_name }}</label>
          </div>
          <div class="advWords">
            <label v-for="item in intro_items" class="info intro subtitle">
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
                <label v-show="this.equip_judge[0]" class="info yes_judge">Yes</label>
                <label v-show="!this.equip_judge[0]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <dish-icon class="icon" />
                <label class="info">Breakfast:</label>
                <label v-show="this.equip_judge[1]" class="info yes_judge">Yes</label>
                <label v-show="!this.equip_judge[1]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <smoke-detector-icon class="icon" />
                <label class="info">Smoke Detector:</label>
                <label v-show="this.equip_judge[2]" class="info yes_judge">Yes</label>
                <label v-show="!this.equip_judge[2]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <tv-icon class="icon" />
                <label class="info">Television:</label>
                <label v-show="this.equip_judge[3]" class="info yes_judge">Yes</label>
                <label v-show="!this.equip_judge[3]" class="info no_judge">No</label>
              </div>
            </div>
            <div class="line">
              <div class="elemt">
                <washing-machine-icon class="icon" />
                <label class="info">Wash Machine:</label>
                <label v-show="this.equip_judge[4]" class="info yes_judge">Yes</label>
                <label v-show="!this.equip_judge[4]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <fridge-icon class="icon" />
                <label class="info">Fridge:</label>
                <label v-show="this.equip_judge[5]" class="info yes_judge">Yes</label>
                <label v-show="!this.equip_judge[5]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <microwave-icon class="icon" />
                <label class="info">Microwave:</label>
                <label v-show="this.equip_judge[6]" class="info yes_judge">Yes</label>
                <label v-show="!this.equip_judge[6]" class="info no_judge">No</label>
              </div>
              <div class="elemt">
                <parking-icon class="icon" />
                <label class="info">Parking Space:</label>
                <label v-show="this.equip_judge[7]" class="info yes_judge">Yes</label>
                <label v-show="!this.equip_judge[7]" class="info no_judge">No</label>
              </div>
            </div>
          </div>
        </div>

        <div class="bookInfo">
          <label class="book price">$ {{ price }}</label>
          <br />
          <label class="book">Date</label>
          <br />
          <label class="book">Room Type</label>
          <label class="book">{{ room_type }}</label>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.houseBigPic img {
  height: 33vw;
  // width :33vw
}

.houseBigPic {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  overflow-x: scroll;
  white-space: nowrap;
}

// roll scroll
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.aboutHouse {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;

  .houseInfo {
    padding: 36px;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    width: 67vw;
    align-items: flex-start;

    .info {
      padding: 5px;
      display: flex;
      align-items: stretch;
      flex-direction: column;
      align-items: flex-start;
    }

    .intro {
      height: 50px;
      font-weight: normal;
    }

    .subtitle {
      font-weight: bolder;
      padding-top: 30px;
    }

    .titleWords {
      font-weight: bolder;
      font-size: 30px;
      padding: 36px 0px 36px 0px;
    }

    .iconPart {
      padding: 5px;
      display: flex;
      flex-direction: row;
      align-items: center;
      align-self: stretch;

      .line {
        display: flex;
        flex-direction: column;
        // justify-content : center;
        // flex-direction: column;
        align-items: stretch;
        align-self: stretch;
        width: 50%;

        .elemt {
          display: flex;
          flex-direction: column;
          align-items: center;
          align-self: stretch;
          flex-wrap: nowrap;
          padding: 15px;
        }
      }
    }
  }

  .bookInfo {
    padding: 36px;
    display: flex;
    position: sticky;
    top: 10px;
    align-items: stretch;
    flex-direction: column;
    width: 33vw;
    border-style: solid;
    border-width: 1px;

    .price {
      align-self: flex-start;
      font-weight: bolder;
      font-size: 30px;
    }
  }
}

.yes_judge {
  font-weight: bolder;
  color: green;
}

.no_judge {
  font-weight: bolder;
  color: colors.error;
}
</style>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import wifiIcon from "mdi-vue/Wifi"; // works without an extension too
import dishIcon from "mdi-vue/SilverwareForkKnife";
import smokeDetectorIcon from "mdi-vue/SmokeDetector";
import tvIcon from "mdi-vue/TelevisionClassic";
import washingMachineIcon from "mdi-vue/WashingMachine";
import fridgeIcon from "mdi-vue/FridgeBottom";
import microwaveIcon from "mdi-vue/Microwave";
import parkingIcon from "mdi-vue/Parking";

@Component({
  components: {
    wifiIcon,
    dishIcon,
    smokeDetectorIcon,
    tvIcon,
    washingMachineIcon,
    fridgeIcon,
    microwaveIcon,
    parkingIcon
  }
})
export default class houseDetail extends Vue {
  equip_judge = [false, true, true, false, true, false, true, true];
  price = 450;
  room_type = "Single";
  house_name = "YOUR BEST CHOICE IN THE WORLD!";
  img1 = [
    {
      url:
        "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large"
    },
    {
      url:
        "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large"
    },
    {
      url:
        "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large"
    }
  ];
  intro_items = [
    {
      subtitle: "Great Location",
      intro_text: "37 XueYuan Road, XiCheng, BeiJing"
    },
    {
      subtitle: "Entire House",
      intro_text: "7 guests, 3 bedrooms, 7 beds, 3 baths"
    },
    {
      subtitle: "Complete Facilities",
      intro_text: "Golf course, Hot Spring, Bar"
    }
  ];
}
</script>
