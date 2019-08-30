<template>
  <div>
    <div class="container">
      <div class="LeftSide">
        <h1>Review Home Rules</h1>
        <div class="staytime">
          <h2>{{ "__Days" }} Night At {{ room.address.city }}</h2>
          <div class="startAndEnd">
            <div class="time_container">{{ searchStatus.startTime.format("YYYY-MM-DD") }}</div>
            <div class="time_container">{{ searchStatus.endTime.format("YYYY-MM-DD") }}</div>
          </div>
        </div>
        <hr align="left" width="90%" size="1" />
        <div class="keep_in_mind">
          <h2>Things To Keep In Mind</h2>
          <div class="rules">
            <div class="rule" v-show="room.noticeJudge[0]">
              <div class="rule_icon">
                <no-smoking-icon />
              </div>
              <div class="rule_description">
                <label class="rule_des">No Smoking</label>
              </div>
            </div>
            <div class="rule" v-show="room.noticeJudge[1]">
              <div class="rule_icon">
                <no-pets-icon />
              </div>
              <div class="rule_description">
                <label class="rule_des">No Pets</label>
              </div>
            </div>
            <div class="rule" v-show="room.noticeJudge[2]">
              <div class="rule_icon">
                <no-noise-icon />
              </div>
              <div class="rule_description">
                <label class="rule_des">Don't Make Loud Noise</label>
              </div>
            </div>
            <div class="rule" v-show="room.noticeJudge[3]">
              <div class="rule_icon">
                <no-shot-icon />
              </div>
              <div class="rule_description">
                <label class="rule_des">Don't Take Pictures</label>
              </div>
            </div>
            <div class="rule" v-show="room.noticeJudge[4]">
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
          <img class="pic" alt="housePic" :src="room.img[0]||''" />
        </div>
        <div class="title">
          <label class="pic_title">{{ room.name }}</label>
        </div>
        <hr align="center" width="100%" size="1" />
        <div class="book_info">
          <div class="iconAndWords">
            <guest-icon class="guest_info" />
            <label class="guest_info">{{ searchStatus.roomType }} guests</label>
          </div>
          <div class="iconAndWords">
            <date-icon class="guest_info" />
            <label
              class="date_info"
            >{{ searchStatus.startTime.format("YYYY-MM-DD") }} &rarr; {{searchStatus.endTime.format("YYYY-MM-DD")}}</label>
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
  display: flex
  justify-content: center
  flex-direction: row
  align-items: flex-start

  .LeftSide {
    display: flex
    flex-direction: column
    lost-column: 2 / 3 0 spaces._7

    h1 {
      font-size: font-sizes.large-title
      font-weight: normal
      text-transform: uppercase
      text-align: left
    }

    .staytime {
      h2 {
        font-size: font-sizes.small-title
        font-weight: normal
        text-transform: uppercase
        text-align: left
      }
    }

    .startAndEnd {
      padding: 10px
      display: flex
      flex-direction: row
      justify-content: space-between

      .time_container {
        display: flex
        flex-direction: row
        width: 50%

        .date_container {
          display: flex
          flex-direction: column
          border-style: solid
          border-width: 1px
          padding: 10px
          margin-right: 20px
        }

        .checkinout_container {
          display: flex
          flex-direction: column
          margin: 10px
          align-items: flex-start
        }
      }
    }

    .keep_in_mind {
      .rules {
        display: flex
        flex-direction: column

        .rule {
          display: flex
          flex-direction: row
          align-items: center

          .rule_icon {
            border-style: solid
            border-width: 1px
            padding: 10px
            margin: 10px
            margin-right: 20px
          }

          .rule_description {
            font-size: font-sizes.body-larger
            font-weight: normal
            text-align: left
          }
        }
      }
    }

    #search-btn {
      margin: 50px
      font-size: font-sizes.medium-title
    }
  }

  .RightSide {
    display: flex
    position: sticky
    margin-top: spaces._7
    top: 30px
    align-items: stretch
    flex-direction: column
    lost-column: 1 / 3 0 spaces._7

    .overview {
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center

      .pic {
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        width: 20vw
        height: 100%
      }
    }

    .title {
      display: flex
      flex-direction: column
      align-self: flex-start
      padding: 30px 5px 20px 5px
      font-size: font-sizes.body-larger
      font-weight: bolder
    }

    .book_info {
      display: flex
      flex-direction: column
      justify-content: center
      align-items: stretch
      align-self: flex-start

      .iconAndWords {
        padding: 5px
        display: flex
        flex-direction: row
        align-items: flex-start

        .guest_info {
          margin-right: 10px
        }
      }
    }

    .total {
      display: flex
      align-self: flex-end
      justify-content: flex-end

      .total_cost {
        padding-top: 30px
        font-size: font-sizes.small-title
        font-weight: bolder
        text-align: left
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
import { exampleRoom, Room } from "@/models/Room";
import { SearchStatus } from "@/store/search";
import moment from "moment";

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
  id: string = "";
  error: string = "";
  room: Room = exampleRoom;
  isLoading: boolean = true;

  searchStatus: SearchStatus = this.$store.state.searchStore.status;

  async mounted() {
    await this.updateRoom();
  }

  get totalCost() {
    let duration = moment.duration(
      this.searchStatus.endTime.diff(this.searchStatus.startTime)
    );

    return (duration.days() + 1) * (this.room.shortPrice as number);
  }

  async updateRoom() {
    this.id = this.$route.params.id;
    try {
      await this.$store.dispatch("assureRoomAvailability", this.id);
    } catch (e) {
      this.error = e;
    }
    this.room = this.$store.getters.getRoomById(this.id);
    this.isLoading = false;
  }
}
</script>
