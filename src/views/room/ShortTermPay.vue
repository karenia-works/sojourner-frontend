<template>
  <div>
    <div class="container">
      <h1>Enjoy Your Journey!</h1>
      <div class="pay-button">
        <div class="wechatpay">
          <button id="search-btn" class="btn search-btn" v-on:click="WechatPay">WechatPay</button>
        </div>
        <div class="alipay">
          <button id="search-btn" class="btn search-btn" v-on:click="AliPay">AliPay</button>
        </div>
      </div>
      <div class="img_pay">
        <img class="img" v-show="this.wechatPay" src="../../assets/wechatpay.jpg" />
        <img class="img" v-show="!this.wechatPay" src="../../assets/alipay.jpg" />
      </div>
      <div class="confirm-btn">
        <h2>
          <router-link to="/u/me" class="btn-span">I have completed the payment</router-link>
        </h2>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  display: flex
  display: flex
  flex-direction: column

  .pay-button {
    height: 150px
    display: flex
    flex-direction: row
    justify-content: center

    &>* {
      margin-h: spaces._5
    }
  }

  #search-btn {
    font-size: font-sizes.medium-title
  }

  .img_pay {
    display: flex
    justify-content: center
    align-items: center
  }

  .img_pay img {
    max-width: 30vw
    max-height: 30vw
    width: auto
    height: auto
  }

  .confirm-btn {
    display: flex
    flex-direction: column
    align-items: center

    h2 {
      text-align: center
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import guestIcon from "mdi-vue/AccountMultiple";
import dateIcon from "mdi-vue/CalendarRange";
@Component({
  components: {
    guestIcon,
    dateIcon
  }
})
export default class ShortTermPay extends Vue {
  stayLength = 3;
  startMonth = "Aug";
  startDay = "27";
  endMonth = "Sep";
  endDay = "12";
  guestNum = "2";
  totalCost = "9102";
  wechatPay = true;
  imgUrl =
    "https://z1.muscache.cn/im/pictures/25625163/d4833a1c_original.jpg?aki_policy=xx_large";
  roomType = "Single";
  houseName = "YOUR BEST CHOICE IN THE WORLD!";

  WechatPay() {
    this.wechatPay = true;
  }
  AliPay() {
    this.wechatPay = false;
  }
}
</script>
