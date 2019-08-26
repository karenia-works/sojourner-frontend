<template>
  <div>
    <div class="container">
      <div class="LeftSide">
        <h1>Review Home Rules</h1>
        <div class="staytime">
          <h2>{{ stayLength }} Night At {{ stayPlace }}</h2>
          <div class="startAndEnd">
            <div class="time_container">
              <div class="date_container">
                <label class="startTime info">{{ startMonth }}</label>
                <label class="startTime info">{{ startDay }}</label>
              </div>
              <div class="checkinout_container">
                <label class="checkin info">Check-in</label>
                <label class="checkin info">3PM - 5PM</label>
              </div>
            </div>
            <div class="time_container">
              <div class="date_container">
                <label class="startTime info">{{ endMonth }}</label>
                <label class="startTime info">{{ endDay }}</label>
              </div>
              <div class="checkinout_container">
                <label class="checkin info">Check-out</label>
                <label class="checkin info">11PM</label>
              </div>
            </div>
          </div>
        </div>
        <hr align="left" width="90%" size="1" />
        <div class="keep_in_mind">
          <h2>Things To Keep In Mind</h2>
          <div class="rules">
            <div class="rule" v-show="noticeJudge[0]">
              <div class="rule_icon">
                <no-smoking-icon />
              </div>
              <div class="rule_description">
                <label class="rule_des">No Smoking</label>
              </div>
            </div>
            <div class="rule" v-show="noticeJudge[1]">
              <div class="rule_icon">
                <no-pets-icon />
              </div>
              <div class="rule_description">
                <label class="rule_des">No Pets</label>
              </div>
            </div>
            <div class="rule" v-show="noticeJudge[2]">
              <div class="rule_icon">
                <no-noise-icon />
              </div>
              <div class="rule_description">
                <label class="rule_des">Don't Make Loud Noise</label>
              </div>
            </div>
            <div class="rule" v-show="noticeJudge[3]">
              <div class="rule_icon">
                <no-shot-icon />
              </div>
              <div class="rule_description">
                <label class="rule_des">Don't Take Pictures</label>
              </div>
            </div>
            <div class="rule" v-show="noticeJudge[4]">
              <div class="rule_icon">
                <no-play-icon />
              </div>
              <div class="rule_description">
                <label class="rule_des">Not Suitable For Playing Games</label>
              </div>
            </div>
          </div>
        </div>
        <div class="agree_button">
          <router-link to="shortpay">
            <button id="search-btn" class="btn search-btn">AGREE</button>
          </router-link>
        </div>
      </div>
      <div class="RightSide">
        <div class="overview">
          <img class="pic" alt="housePic" :src="imgUrl" />
        </div>
        <div class="title">
          <label class="pic_title">{{ houseName }}</label>
        </div>
        <hr align="center" width="100%" size="1" />
        <div class="book_info">
          <div class="iconAndWords">
            <guest-icon class="guest_info" />
            <label class="guest_info">{{guestNum}} guest</label>
          </div>
          <div class="iconAndWords">
            <date-icon class="guest_info" />
            <label
              class="date_info"
            >{{ startMonth }} {{ startDay }} &rarr; {{ endMonth}} {{ endDay }}</label>
          </div>
        </div>
        <hr align="center" width="100%" size="1" />
        <div class="total">
          <label class="total_cost">Total: ${{ totalCost }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;

  .LeftSide {
    display: flex;
    flex-direction: column;
    width: 67vw;

    h1 {
      font-size: font-sizes.large-title;
      font-weight: normal;
      text-transform: uppercase;
      text-align: left;
    }

    .staytime {
      h2 {
        font-size: font-sizes.small-title;
        font-weight: normal;
        text-transform: uppercase;
        text-align: left;
      }
    }

    .startAndEnd {
      padding: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .time_container {
        display: flex;
        flex-direction: row;
        width: 50%;

        .date_container {
          display: flex;
          flex-direction: column;
          border-style: solid;
          border-width: 1px;
          padding: 10px;
          margin-right: 20px;
        }

        .checkinout_container {
          display: flex;
          flex-direction: column;
          margin: 10px;
          align-items: flex-start;
        }
      }
    }

    .keep_in_mind {
      h2 {
        font-size: font-sizes.small-title;
        font-weight: normal;
        text-transform: uppercase;
        text-align: left;
      }

      .rules {
        display: flex;
        flex-direction: column;

        .rule {
          display: flex;
          flex-direction: row;
          align-items: center;

          .rule_icon {
            border-style: solid;
            border-width: 1px;
            padding: 10px;
            margin: 10px;
            margin-right: 20px;
          }

          .rule_description {
            font-size: font-sizes.body-larger;
            font-weight: normal;
            text-align: left;
          }
        }
      }
    }

    #search-btn {
      margin: 50px;
      font-size: font-sizes.medium-title;
    }
  }

  .RightSide {
    padding: 36px;
    display: flex;
    position: sticky;
    top: 10px;
    align-items: stretch;
    flex-direction: column;
    width: 33vw;
    border-style: solid;
    border-width: 1px;

    .overview {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .pic {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 20vw;
        height: 100%;
      }
    }

    .title {
      display: flex;
      flex-direction: column;
      align-self: flex-start;
      padding: 30px 5px 20px 5px;
      font-size: font-sizes.body-larger;
      font-weight: bolder;
    }

    .book_info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      align-self: flex-start;

      .iconAndWords {
        padding: 5px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        .guest_info {
          margin-right: 10px;
        }
      }
    }

    .total {
      display: flex;
      align-self: flex-end;
      justify-content: flex-end;

      .total_cost {
        padding-top: 30px;
        font-size: font-sizes.small-title;
        font-weight: bolder;
        text-align: left;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import guestIcon from "mdi-vue/AccountMultiple";
import dateIcon from "mdi-vue/CalendarRange";
import noSmokingIcon from "mdi-vue/SmokingOff";
import noPetsIcon from "mdi-vue/PawOff";
import noNoiseIcon from "mdi-vue/VolumeOff";
import noShotIcon from "mdi-vue/CameraOff";
import noPlayIcon from "mdi-vue/XboxControllerOff";

@Component({
  components: {
    guestIcon,
    dateIcon,
    noSmokingIcon,
    noPetsIcon,
    noNoiseIcon,
    noShotIcon,
    noPlayIcon
  }
})
export default class PayCheck extends Vue {
  stayLength = 3;
  stayPlace = "PuJi Island";
  startMonth = "Aug";
  startDay = "27";
  endMonth = "Sep";
  endDay = "12";
  guestNum = "2";
  totalCost = "9102";
  houseName = "YOUR BEST CHOICE IN THE WORLD!";
  noticeJudge = [false, true, true, false, true];
  imgUrl =
    "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large";
}
</script>