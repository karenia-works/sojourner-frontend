<template>
  <div>
    <div class="container">
      <div class="LeftSide">
        <h1>Enjoy Your Journey!</h1>
        <div class="pay_button">
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
        <div class="confirm_btn">
          <router-link to="/ord">
          <button id="search-btn" class="btn search-btn" >I have completed the payment</button>
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
            <label class="guest_info">{{ guestNum }} guests</label>
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

    .pay_button {
      height: 150px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    #search-btn {
      margin: 50px;
      font-size: font-sizes.medium-title;
    }

    .img_pay {
      /* flex布局（作用于容器） */
      display: flex;
      /* 水平居中（作用于容器） */
      justify-content: center;
      /* 垂直居中（作用于容器） */
      align-items: center;
    }

    .img_pay img {
      max-width: 30vw;
      max-height: 30vw;
      width: auto;
      height: auto;
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