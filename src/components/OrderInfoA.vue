<template>
<div class="orderInfo">
  <img :src="order.room.img" class="room_img" />
  <div class="info">
    <div class="details">
      <p class="room_title">{{order.room.name}}</p>
      <p class="room_city medium">
        {{order.room.address.district}} | {{order.room.address.city}}
      </p>
      <!-- <p class="time">
        <span class="tag">{{rentTime}} rent</span> 
        <span class="medium-text">from </span>
        {{order.startDate|dateStr}}
        <span class="medium-text"> to </span>
        {{order.endDate|dateStr}}
      </p> -->
    </div>
    <template v-if="isStarted">
      <template v-if="order.isLongRent">
        <div class="days">
          <p>
            {{timePassed}}&nbsp;
            month<span v-if="timePassed>1">s</span>
            <span class="medium">
              &nbsp;/&nbsp;{{timeTotal}} total
            </span>
          </p>
          <p>
            {{toDdl}} day<span v-if="toDdl>1">s</span>
            <span class="medium"> left in this billing cycle</span>
          </p>
        </div>
        <div class="buttons">
          <button class="btn">file an issue</button>
          <button class="btn">renew the lease</button>
        </div>
      </template>
      <template v-else>
        <div class="days">
          <p>
            {{timePassed}}&nbsp;
            day<span v-if="timePassed>1">s</span>
            <span class="medium">
              &nbsp;/&nbsp;{{timeTotal}} total
            </span>
          </p>
        </div>
        <div class="buttons">
          <button class="btn">file an issue</button>
        </div>
      </template>
    </template>
    <template v-else>
      <p class="days">
        <span class="medium">from </span>{{order.startDate|dateStr}}
        <span class="medium"> to </span>{{order.endDate|dateStr}}
      </p>
      <p class="days">starts {{toStartDay}} days later</p>
    </template>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment, { Moment } from "moment";
import {Order} from '@/models/Room.ts'

@Component({
  filters: {
    dateStr: function(date: Date) {
      return moment(date).format('L');
    } 
  }
})
export default class OrderInfo extends Vue {
  @Prop() item!: Order;
  order: Order = this.item;

  rentTime: String = this.order.isLongRent ? "long" : "short";

  get isStarted(): Boolean {
    return moment().isAfter(this.order.startDate);
  }

  get timePassed(): Number {
    var start: Moment = moment(this.order.startDate);
    if (this.order.isLongRent) {
      return Math.ceil(moment().diff(start, 'month', true));
    } else {
      return Math.ceil(moment().diff(start, 'day', true));
    }
  }

  get timeTotal(): Number {
    var start: Moment = moment(this.order.startDate);
    var end: Moment = moment(this.order.endDate);
    if (this.order.isLongRent) {
      return end.diff(start, 'month');
    } else {
      return end.diff(start, 'day') + 1;
    }
  }

  get toDdl(): Number {
    var ddl: Moment = moment(this.order.ddlDate).endOf('day');
    return Math.ceil(ddl.diff(moment(), 'day'));
  }

  get toStartDay(): Number {
    var start: Moment = moment(this.order.startDate);
    return Math.ceil(start.diff(moment(), 'day'));
  }

}
</script>

<style lang="stylus" scoped>
.orderInfo {
  width 100%
  border-radius: 3px;
  display flex
}

.orderInfo:hover {
  cursor: pointer;
  background-color rgba(255, 255, 255, 0.5)
}

img {
  width: 270px;
  height 180px
  object-fit: cover;
  border-radius: 3px;
  margin-right: spaces._6;
}

.info {
  height 180px
  display flex
  flex-direction column
  justify-content space-between
}

p {
  margin: 0;
  text-align: left;
}

.days {
  font-family fonts-title
  font-size font-sizes.body-larger
  font-weight 450
}

.medium {
  color: colors.text-medium;
}

.room_title {
  font-weight: 500;
  font-family: fonts-title;
  font-size: font-sizes.small-title;
  clear: right 
  margin-bottom: 5px;
}

.room_city {
  text-transform: uppercase;
}

.buttons {
  height 37px
  display flex
}

.tag {
  padding 1px 5px
  color colors.bg-light
  background-color colors.accent
  text-transform: uppercase
  border-width 3px colors.accent solid
  border-radius 3px
}
</style>

