<template>
  <div class="renew">
    <div class="cover" @click="closeRenew"></div>
    <div class="renewWindow">
      <!-- <h2>renew the release</h2> -->
      <p class="room_title">{{room.name}}</p>
      <p class="room_city medium">at {{room.address.street}}, {{room.address.city}}</p>
      <p class="line">
        <span>renew the lease for</span>
        <input type="number" class="input"  v-model.number="length" />
        <span>month<span v-show="length>1">s</span></span>
      </p>
      <p class="newend">The lease will last to <span>{{newEnd | dateStr}}</span></p>
      <p class="oldend">used to be {{oldEnd | dateStr}}</p>
      <div class="btnDiv">
        <button id="login-btn" class="btn" @click="submitRenew">submit</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import RoomInfo from "@/components/RoomInfo.vue"; // @ is an alias to /src
import {Order} from '@/models/Room.ts'
import {Room} from '@/models/Room.ts'
import moment, { Moment } from "moment";
import axios from 'axios';
import config from "@/config.ts"

@Component({
  filters: {
    dateStr: function(date: Date) {
      return moment(date).format('MMM Do, YYYY');
    }
  }
})
export default class Renew extends Vue {
  @PropSync("show", { default: false, type: Boolean })
    showRenew!: boolean;
  @Prop() room!: Room;
  @Prop() order!: Order;

  length: number = 0;
  oldEnd: Moment = moment(this.order.endDate);
  get newEnd(): Moment {
    return this.oldEnd.clone().add(this.length, 'month');
  }

  closeRenew(): void {
    this.showRenew = false;
  }

  async submitRenew() {
    let len: number = this.length;
    if (len > 0 && len === Math.ceil(len)) {
      let result = await axios.post(
        config.backend.address+`order/extendorderdate/`+this.order.id,
        this.newEnd.toDate(),
        {headers: this.$store.getters.authHeader}
      )
  
      let success = result.status == 201
    } else {
      alert("please check your input");
    }
  }
}
</script>

<style lang="stylus" scoped>
.cover {
  height: 100%
  width: 100%
  position: fixed
  top: 0
  left: 0
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 8
}

.renewWindow {
  width: 400px
  background-color: var(--color-bg-light)
  border-radius: 5px
  position: absolute
  left: 50%
  margin-left: -200px
  z-index: 9
  display: flex
  flex-direction: column
  align-items: center
  padding: spaces._6
}

.btnDiv {
  height: 40px
  margin-top: 15px
  margin-bottom: 10px
}

.input {
  width: 40px
  margin-v: 0
}

.medium {
  color: colors.text-medium;
}

.room_title {
  font-weight: 500;
  font-family: fonts-title;
  font-size: font-sizes.small-title;
  clear: right 
  margin-bottom: 0
}

p {
  margin-v spaces._2
  // font-family fonts-title
}

.line {
  font-size font-sizes.body-larger
  margin-v spaces._5
  }

.newend {
  // font-size font-sizes.body-larger
}

.newend span {
  font-weight 500  
}

.oldend {
  // text-decoration line-through
  margin-top 0
  color colors.text-medium
  }
</style>
