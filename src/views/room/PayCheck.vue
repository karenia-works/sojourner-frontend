<template>
  <div>
    <div class="container">
      <h1>Review Your Order</h1>
      <div class="house-info">
        <h2>
          <span class="dull-text">Name:</span>
          {{ room.name }}
        </h2>
        <h3>
          <span class="dull-text">Address:</span>
          {{ room.address.street }}, {{ room.address.city }}
        </h3>
        <!-- <div class="left">
        </div>-->
        <!-- <img class="pic right" alt="housePic" :src="room.img[0]||''" /> -->
      </div>
      <div class="startAndEnd">
        <div class="time-container">
          <div class="label">Check in</div>
          <div class="time">{{ pendingOrder.startDate.format("YYYY-MM-DD") }}</div>
        </div>
        <mdi-right-arrow />
        <div class="time-container">
          <div class="label">Check out</div>
          <div class="time">{{ pendingOrder.endDate.format("YYYY-MM-DD") }}</div>
        </div>
      </div>
      <div class="keep_in_mind">
        <h2>Things To Keep In Mind</h2>
        <template v-if="hasNotice">
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
        </template>
        <template v-else>The house owner did not specify anything special to notice.</template>
      </div>

      <div class="long-contract" v-if="pendingOrder.isLongRent">
        <h2>Long rent contract</h2>
        <p>
          <strong>Please print out the following contract:</strong>
        </p>
        <p>
          <a @click="showContract">Long term contract</a>
        </p>
      </div>

      <hr />

      <div class="total">
        <label class="total_cost">Total: ${{ pendingOrder.totalPrice }}</label>
        <div class="per-cost" v-if="!pendingOrder.isLongRent">${{ room.shortPrice }} / day</div>
        <div class="per-cost" v-else>${{ room.longPrice }} / month</div>
      </div>
      <div class="agree-button">
        <a @click="lastPage">
          <button id="search-btn" class="btn search-btn dull">Cancel</button>
        </a>
        <a @click="proceedPayment">
          <button id="search-btn" class="btn search-btn">Proceed</button>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  display: flex
  justify-content: center
  flex-direction: column
  align-items: stretch

  h1 {
    font-size: font-sizes.large-title
    font-weight: normal
    text-align: left
    margin-bottom: spaces._6
  }

  h2 {
    margin-top: spaces._7
    text-transform: none
  }
}

.house-info {
  // lost-flex-container: row
}

.startAndEnd {
  display: flex
  flex-direction: row
  justify-content: flex-start
  align-items: center
  margin-h: -(spaces._4)

  .time-container {
    margin-h: spaces._4

    .label {
      font-size: font-sizes.body-larger
      color: var(--color-text-medium)
      font-weight: bold
    }

    .time {
      font-family: fonts-title
      font-size: font-sizes.medium-title
      font-weight: 500
    }
  }
}

.keep_in_mind {
  font-size: font-sizes.body-larger

  .rules {
    display: flex
    flex-direction: column

    .rule {
      display: flex
      flex-direction: row
      align-items: center
      margin-v: spaces._3

      .rule_icon {
        margin-right: spaces._3
      }

      .rule_description {
        font-weight: normal
        text-align: left
      }
    }
  }
}

.agree-button {
  margin-v: spaces._6
  margin-h: -(spaces._3)
  display: flex
  flex-direction: row
  justify-content: flex-start

  .btn {
    margin-h: spaces._3
    font-size: font-sizes.large-title
  }
}

.overview {
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
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

hr {
  width: 30%
  margin-v: spaces._6
  text-align: left
  margin-left: 0
  margin-right: auto
}

.total {
  display: flex
  flex-direction: column
  justify-content: flex-start
  margin-top: spaces._6

  .total_cost {
    font-family: fonts-title
    font-size: font-sizes.medium-title
    font-weight: bold
    text-align: left
  }

  .per-cost {
    margin-top: spaces._4
    font-weight: 500
    color: var(--color-text-medium)
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
import { exampleRoom, Room, Order, PendingOrder } from "@/models/Room";
import { SearchStatus } from "@/store/search";
import moment from "moment";

import MdiRightArrow from "mdi-vue/ArrowRightThick";

@Component({
  components: {
    guestIcon,
    dateIcon,
    noSmokingIcon,
    noPetsIcon,
    noNoiseIcon,
    noShotIcon,
    noPlayIcon,
    MdiRightArrow
  }
})
export default class PayCheck extends Vue {
  id: string = "";
  error: string = "";
  room: Room = exampleRoom;
  isLoading: boolean = true;

  // searchStatus: SearchStatus = this.$store.state.searchStore.status;
  pendingOrder: PendingOrder = this.$store.state.orderStore.pending;

  async mounted() {
    await this.updateRoom();
  }

  get totalCost() {
    let duration = moment.duration(
      this.pendingOrder.startDate.diff(this.pendingOrder.endDate)
    );

    return (duration.days() + 1) * (this.room.shortPrice as number);
  }

  get rentDays() {
    return (
      moment
        .duration(
          moment(this.pendingOrder.startDate).diff(this.pendingOrder.endDate)
        )
        .asDays() + 1
    );
  }

  get hasNotice() {
    return this.room.noticeJudge.some(value => value);
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

  lastPage() {
    this.$router.back();
  }

  showContract() {
    window.open(
      `/r/${this.id}/longPay?stayPlace=${
        this.room.name
      }&startTime=${this.pendingOrder.startDate.toISOString()}&endTime=${this.pendingOrder.endDate.toISOString()}&totalCost=${
        this.pendingOrder.totalPrice
      }&roomType=${this.room.type}`,
      "_blank"
    );
  }

  async proceedPayment() {
    await this.$store.dispatch("sendPendingOrder");
    if (this.pendingOrder.isLongRent) {
      this.$router.push({ name: "user_me" });
    } else {
      this.$router.push({ name: "short_term_pay" });
    }
  }
}
</script>
