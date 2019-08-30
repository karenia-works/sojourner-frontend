<template>
<div class="orderInfo">
  <img :src="room.img[0]" class="room_img" />
  <div class="info">
    <p class="room_title">{{room.name}}</p>
    <p class="room_city medium">
      <span>{{room.address.street}} | </span>
      <span>{{room.address.city}}</span>
    </p>
    <template v-if="isStarted">
      <template v-if="order.isLongRent">
        <!-- longRent order -->
        <div class="details">
          <p>
            <span>{{timePassed | months}}</span>
            <span class="medium"> / {{timeTotal}} total</span>
          </p>
          <p>
            <span>{{toDdl | days}}</span>
            <span class="medium"> left in this billing cycle</span>
          </p>
        </div>
        <div class="buttons">
          <button class="btn" @click="toggleIssueWindow">file an issue</button>
          <button class="btn" @click="openRenew">renew the lease</button>
          <!-- <div class="renew" v-if="showRenew"> -->
            <!-- <div class="cover" @click="toggleRenew"></div> -->
            <Renew :room="room" :order="order" :show.sync="showRenew" v-if="showRenew"></Renew>
          <!-- </div> -->
        </div>
        <!-- longRent order ends -->
      </template>
      <template v-else>
        <!-- shortRent orders -->
        <div class="details">
          <p class="medium">
            <span>{{order.startDate | dateStr}} - </span>
            <span>{{order.endDate | dateStr}}</span>
          </p>
          <p>
            <span>{{timePassed | days}}</span>
            <span class="medium"> / {{timeTotal}} total</span>
          </p>
        </div>
        <div class="buttons">
          <button class="btn"  @click="toggleIssueWindow">file an issue</button>
        </div>
        <!-- shortRent order ends -->
      </template>
      <div class="issue" v-if="showIssue">
        <div class="cover" @click="toggleIssueWindow"></div>
        <NewIssue class="issueWindow"></NewIssue>
      </div>
    </template>
    <template v-else>
      <!-- future Order -->
      <div class="details">
        <p class="medium">
          <span>{{order.startDate|dateStr}} - </span>
          <span>{{order.endDate|dateStr}}</span>
        </p>
        <p>starts {{toStartDay}} days later</p>
      </div>
      <!-- future Order ends -->
    </template>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment, { Moment } from "moment";
import NewIssue from "@/views/forms/NewIssue.vue";
import Renew from "@/views/user/Renew.vue";
import {Order} from '@/models/Room.ts'
import {Room} from '@/models/Room.ts'

@Component({
  filters: {
    dateStr: function(date: Date) {
      return moment(date).format('MMM Do');
    },
    days: function(num: number) {
      return "" + (num) +
       " day" + (num>1 ? "s" : "");
    },
    months: function(num: number) {
      return "" + (num) +
       " month" + (num>1 ? "s" : "");
    }
  },
  components: {
    NewIssue,
    Renew
  }
})
export default class OrderInfoA extends Vue {
  showIssue: boolean = false;  
  toggleIssueWindow(): void {
    this.showIssue = !this.showIssue;
  }
  
  showRenew: boolean = false;  
  openRenew(): void {
    this.showRenew = true;
  }

  @Prop() item!: Order;
  order: Order = this.item;
  room: Room = {
    id: "789123789123789123789321",
    name: "Amazing view - Moderne apartment",
    description: "",
    type: "quad",
    longAvailable: true,
    shortAvailable: true,
    longPrice: 3000,
    shortPrice: 156,
    img:
      ["https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large"],
    address: {
      country: "Iceland",
      city: "Akureyri",
      street: "Villa Lola"
    },
    equipJudge: [],
    noticeJudge: []
  };

  rentType: String = this.order.isLongRent ? "long" : "short";

  get isStarted(): Boolean {
    return moment().isAfter(this.order.startDate);
  }

  get timePassed(): number {
    let start: Moment = moment(this.order.startDate);
    return this.order.isLongRent ?
      Math.ceil(moment().diff(start, 'month', true)) :
      Math.ceil(moment().diff(start, 'day', true));
  }

  get timeTotal(): Number {
    let start: Moment = moment(this.order.startDate);
    let end: Moment = moment(this.order.endDate);
    if (this.order.isLongRent) {
      return end.diff(start, 'month');
    } else {
      return end.diff(start, 'day') + 1;
    }
  }

  get toDdl(): Number {
    let ddl: Moment = moment(this.order.ddlDate).endOf('day');
    return Math.ceil(ddl.diff(moment(), 'day'));
  }

  get toStartDay(): Number {
    let start: Moment = moment(this.order.startDate);
    return Math.ceil(start.diff(moment(), 'day'));
  }

}
</script>

<style lang="stylus" scoped>
.orderInfo {
  width 100%
  border-radius: 3px;
  display flex
  align-items: flex-end
}

img {
  width: 270px;
  height 180px
  object-fit: cover;
  border-radius: 3px;
  margin-right: spaces._6;
}

p {
  margin: 0;
  text-align: left;
}

.medium {
  color: colors.text-medium;
}

.room_title {
  font-weight: 500;
  font-family: fonts-title;
  font-size: font-sizes.small-title;
  clear: right 
  margin-bottom: spaces._1
}

.room_city {
  text-transform: uppercase;
  margin-bottom spaces._4
}

.details {
  font-family fonts-title
  font-size 18px
  font-weight 450
}

.buttons {
  height 37px
  display flex
  margin-top spaces._4
}

.btn {
  margin-left 0
  margin-right spaces._4
  margin-bottom 0
}

.tag {
  padding 1px 5px
  color colors.bg-light
  background-color colors.accent
  text-transform: uppercase
  border-width 3px colors.accent solid
  border-radius 3px
}

.cover {
  height: 100%
  width: 100%
  position: fixed
  top: 0
  left: 0
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 8
}

.issueWindow {
  width: 400px
  background-color: var(--color-bg-light)
  border-radius: 5px
  position fixed
  top: 20%
  left: 50%
  margin-left: -200px
  z-index: 9
  display: flex
  flex-direction: column
  align-items: center
  padding: spaces._6
}
</style>

