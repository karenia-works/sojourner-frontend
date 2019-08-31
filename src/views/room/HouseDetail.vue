<template>
  <div class="houseDetail">
    <template v-if="room && !isLoading">
      <div class="houseBigPic" v-if="room.img">
        <img :src="room.img[0]" />
      </div>
      <div class="about-room">
        <div class="container">
          <div class="room-info">
            <div class="room-title">
              <h1>{{ room.name }}</h1>
            </div>
            <div class="room-address" v-show="room.address">
              {{ room.address.street }}
              {{ room.address.city }}
            </div>
            <div class="room-description">
              <vue-markdown :source="room.description"></vue-markdown>
            </div>
            <hr align="center" width="100%" size="1" />
            <div class="iconPart">
              <h3>House equipments</h3>
              <div class="icons">
                <div class="icon-line" :class="equipClassArray[0]">
                  <wifi-icon class="icon" />
                  <div class="icon-desc">Wi-fi</div>
                </div>
                <div class="icon-line" :class="equipClassArray[1]">
                  <dish-icon class="icon" />
                  <div class="icon-desc">Kitchen</div>
                </div>
                <div class="icon-line" :class="equipClassArray[2]">
                  <smoke-detector-icon class="icon" />
                  <div class="icon-desc">Smoke Detector</div>
                </div>
                <div class="icon-line" :class="equipClassArray[3]">
                  <washing-machine-icon class="icon" />
                  <div class="icon-desc">Washing Machine</div>
                </div>
                <div class="icon-line" :class="equipClassArray[4]">
                  <tv-icon class="icon" />
                  <div class="icon-desc">Television</div>
                </div>
                <div class="icon-line" :class="equipClassArray[5]">
                  <fridge-icon class="icon" />
                  <div class="icon-desc">Fridge</div>
                </div>
                <div class="icon-line" :class="equipClassArray[6]">
                  <microwave-icon class="icon" />
                  <div class="icon-desc">Microwave Oven</div>
                </div>
                <div class="icon-line" :class="equipClassArray[7]">
                  <parking-icon class="icon" />
                  <div class="icon-desc">Parking space</div>
                </div>
              </div>
              <div class="gallery" v-if="room.img">
                <h3>Gallery</h3>
                <img v-for="img in room.img" :key="img" :src="img" class="gallery-img" />
              </div>
            </div>
          </div>
          <div class="bookInfo">
            <div class="total-price">${{ totalPrice }}</div>
            <div class="room-price">
              <template v-if="rentByDay">${{ room.shortPrice }} / day</template>
              <template v-else>${{ room.longPrice }} / month</template>
            </div>
            <div class="date-select">
              <date-picker
                :selected-date.sync="startDate"
                :selected-date-end="endDate"
                :is-selecting-date-end="false"
                :has-date-end="true"
              ></date-picker>
              <arrow-right-icon />
              <date-picker
                :selected-date="startDate"
                :selected-date-end.sync="endDate"
                :is-selecting-date-end="true"
                :has-date-end="true"
              ></date-picker>
              <br />
            </div>
            <div class="rent-by-selection">
              <div>Rent by</div>
              <list-selection :options="rentOptions" :selection.sync="rentSelection"></list-selection>
            </div>
            <div class="rent_button">
              <button id="rent-btn" class="btn rent-btn" @click="rent">Rent</button>
            </div>
            <div class="rent-error" v-if="rentError">{{rentError}}</div>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="error">{{error}}</template>
    <template v-else>
      <loading-bar />
      <div class="houseBigPic loading"></div>
      <div class="about-room loading">
        <div class="container">
          <div class="room-info">
            <div class="room-title">
              <h1>Loremipsumdolor</h1>
            </div>
            <div class="room-address">Loremipsumlah blahblah</div>
            <div class="room-description">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis volutpat, tempor cursus lacinia nullam. Sit at quam ut elit non varius luctus. In amet, in praesent dolor nunc, integer sagittis, tincidunt molestie. Fringilla massa porta nec, lacus, hendrerit lectus ac risus. Auctor id commodo diam sed morbi. Duis elit faucibus et eget velit.</p>
              <p>Suspendisse ultricies pharetra, vestibulum, quis porta varius nam. Turpis nunc tellus aliquet ornare posuere nam scelerisque volutpat. Accumsan faucibus ut orci mi platea iaculis. Enim feugiat quam purus diam ornare quis. Consectetur ornare id sem donec faucibus blandit. Sed ornare sed ultrices at tristique at elementum. Auctor id risus metus blandit tortor, elementum sed. Imperdiet arcu nec, a fames urna lorem proin non vitae.</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="stylus" scoped>
.houseBigPic {
  margin-bottom: spaces._6
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  width: 100%
  flex: 1
  overflow: hidden
  white-space: nowrap
  height: 40vw
  background: var(--color-bg-medium)

  img {
    width: 100%
    height: 100%
    object-fit: cover
  }

  & * {
    // roll scroll
    ::-webkit-scrollbar {
      width: 0 !important
    }

    ::-webkit-scrollbar {
      width: 0 !important
      height: 0
    }

    scrollbar-width: none
  }

  &.loading {
    background: var(--color-bg-medium)
  }
}

.about-room {
  .container {
    align-items: flex-start
  }

  .room-info {
    display: flex
    align-items: stretch
    flex-direction: column
    align-items: flex-start
    margin-v: -(spaces._4)

    +break-screen(breakpoints.medium, 0) {
      lost-column: 2 / 3 0 spaces._7
    }

    +break-screen(0, breakpoints.medium) {
      lost-column: 1 / 2 0 spaces._7
    }

    .room-title {
      h1 {
        font-weight: normal
        text-transform: none
        margin: 0px
        padding: 0px
      }

      margin-v: spaces._4
    }

    .room-address {
      font-family: fonts-title
      font-size: font-sizes.small-title
      font-weight: 500
      color: var(--color-text-medium)
      margin-v: spaces._3
    }

    .room-description {
      margin-v: spaces._5
    }

    .icons {
      lost-flex-container: row

      .icon-line {
        display: flex
        flex-direction: row
        align-items: center
        font-weight: 500

        +break-screen(0, breakpoints.medium) {
          lost-waffle: 1 / 2 0 0px
        }

        +break-screen(breakpoints.medium, 0) {
          lost-waffle: 1 / 3 0 0px
        }

        .mdi {
          margin: spaces._2
        }

        &.no * {
          color: var(--color-bg-medium)
          fill: var(--color-bg-medium)
        }
      }
    }

    .gallery {
      .gallery-img {
        max-width: 100%
      }
    }
  }

  &.loading * {
    color: var(--color-bg-medium) !important
    font-family: 'Redacted' !important
  }

  .bookInfo {
    display: flex
    position: sticky
    top: spaces._4
    align-items: stretch
    flex-direction: column
    margin-top: -(spaces._4)
    height: auto

    +break-screen(breakpoints.medium, 0) {
      lost-column: 1 / 3 0 spaces._7
    }

    +break-screen(0, breakpoints.medium) {
      lost-column: 1 / 2 0 spaces._7
    }

    .total-price {
      font-size: 36px
      font-family: fonts-title
      font-weight: 500
      margin-top: spaces._6
      margin-bottom: spaces._4
    }

    .room-price {
      font-weight: 500
      color: var(--color-text-medium)
      margin-v: spaces._4
    }

    .date-select {
      font-size: 28px
      display: flex
      flex-direction: row
      align-items: center
      margin-v: spaces._4
    }

    .rent-by-selection {
      display: flex
      flex-direction: row
      font-size: 20px
      margin-v: spaces._4
    }

    .rent_button {
      margin-v: spaces._4

      .rent-btn {
        font-size: 24px
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
import {
  Component,
  Emit,
  Vue,
  Prop,
  Model,
  Watch
} from "vue-property-decorator";
import wifiIcon from "mdi-vue/Wifi"; // works without an extension too
import dishIcon from "mdi-vue/SilverwareForkKnife";
import smokeDetectorIcon from "mdi-vue/SmokeDetector";
import tvIcon from "mdi-vue/TelevisionClassic";
import washingMachineIcon from "mdi-vue/WashingMachine";
import fridgeIcon from "mdi-vue/FridgeBottom";
import microwaveIcon from "mdi-vue/Microwave";
import parkingIcon from "mdi-vue/Parking";
import ArrowRightIcon from "mdi-vue/ArrowRight";
import DatePicker from "@/components/DatePicker.vue";
import ListSelection from "@/components/ListSelection.vue";
import moment, { Moment } from "moment";
import { Room, exampleRoom, Order, PendingOrder } from "@/models/Room.ts";
import { SearchStatus } from "../../store/search";
import VueMarkdown from "vue-markdown";
import { isPrimitive } from "vue-class-component/lib/util";
import LoadingBar from "@/components/LoadingBar.vue";

@Component({
  components: {
    ListSelection,
    wifiIcon,
    dishIcon,
    smokeDetectorIcon,
    tvIcon,
    washingMachineIcon,
    fridgeIcon,
    microwaveIcon,
    parkingIcon,
    DatePicker,
    ArrowRightIcon,
    VueMarkdown,
    LoadingBar
  }
})
export default class HouseDetail extends Vue {
  // @Prop({ default: () => moment(), type: moment }) initialStartDate!: Moment;
  // @Prop({ default: () => moment(), type: moment }) initialEndDate!: Mom1ent;
  // @Prop({ default: () => "", type: String }) initialSearchStr: string = "";

  EquipJudge = [false, true, true, false, true, false, true, true];

  room: Room = exampleRoom;
  isLoading = true;
  error: string | boolean = false;
  rentError: string | boolean = false;

  get startDate() {
    return this.searchStatus.startTime;
  }
  set startDate(value: Moment) {
    this.searchStatus.startTime = value;
    this.$store.commit("replaceSearch", this.searchStatus);
  }
  get endDate() {
    return this.searchStatus.endTime;
  }
  set endDate(value: Moment) {
    this.searchStatus.endTime = value;
    this.$store.commit("replaceSearch", this.searchStatus);
  }

  get searchStr() {
    return this.searchStatus.keyword;
  }

  get equipClassArray() {
    return this.room.equipJudge.map(val => {
      return {
        "icon-line": true,
        no: !val
      };
    });
  }

  searchStatus: SearchStatus = this.$store.state.searchStore.status;

  startDateValid: boolean = true;
  endDateValid: boolean = true;

  houseName = "Xueyuanlu 37tg";

  id = "";

  rentByDay: boolean = false;

  get rentOptions() {
    let options: string[] = [];
    if (this.room.shortAvailable) options.push("Day");
    if (this.room.longAvailable) options.push("Month");
    return options;
  }

  get rentSelection() {
    if (this.rentByDay || !this.room.shortAvailable) {
      return new Set([0]);
    } else {
      return new Set([1]);
    }
  }

  set rentSelection(value: Set<number>) {
    if (value.has(1) || this.room.shortAvailable) {
      this.rentByDay = false;
    } else {
      this.rentByDay = true;
    }
  }

  get totalPrice() {
    let duration = moment.duration(this.endDate.diff(this.startDate));
    if (this.rentByDay && this.room.shortPrice) {
      return (duration.days() + 1) * this.room.shortPrice;
    } else if (!this.rentByDay && this.room.longPrice) {
      return (duration.months() + 1) * this.room.longPrice;
    } else {
      return NaN;
    }
  }

  async mounted() {
    await this.updateRoom();
    if (this.searchStatus.useLongRent === false && this.room.shortAvailable) {
      this.rentByDay = true;
    } else {
      this.rentByDay = false;
    }
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

  // date = moment(this.startDate).format("YYYY-MM-DD");

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  async rent() {
    if (!this.$store.state.userStore.loggedIn) {
      this.rentError = "You are not logged in!";
      return;
    }
    this.rentError = false;

    let houseId = this.room.id;
    let userEmail = this.$store.state.userStore.email;
    let startDate = this.startDate;
    let endDate = this.endDate;
    let isLongRent = !this.rentByDay;
    let createDate = new Date();
    let totalPrice = this.totalPrice;
    let order = new PendingOrder(
      houseId,
      userEmail,
      startDate,
      endDate,
      isLongRent,
      totalPrice,
      createDate
    );

    await this.$store.dispatch("setPendingOrder", order);

    this.$router.push(`/r/${this.room.id}/submit`);
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
