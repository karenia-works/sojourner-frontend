<template>
  <div>
    <div class="container">
      <div class="LeftSide">
        <h1>Review Home Rules</h1>
        <div class="staytime">
          <h2>{{ stayLength }} Night At {{ stayPlace }}</h2>
          <div class="startAndEnd">
            <label class="startTime info">Tuesday Check-in</label>
            <label class="startTime info">3PM - 5PM</label>
            <label class="endTime info">Tuesday Check-in</label>
            <label class="endTime info">3PM - 5PM</label>
          </div>
        </div>
      </div>
      <div class="RightSide">
        <div class="overview">
          <img class="pic" alt="housePic" src="../../assets/house_big_pic.jpg" />
        </div>
        <div class="title">
          <label class="pic_title">YOUR BEST CHIOCE IN THE WORLD</label>
        </div>
        <hr align="center" width="100%" size="1" />
        <div class="book_info">
          <div class="iconAndWords">
            <guest-icon class="guest_info" />
            <label class="guest_info">1 guest</label>
          </div>
          <div class="iconAndWords">
            <date-icon class="guest_info" />
            <label class="date_info">Aug 7 -> Aug 29</label>
          </div>
        </div>
        <hr align="center" width="100%" size="1" />
        <div class="total">
            <label class="total_cost">Total: $9102</label>
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
    align-items: stretch;
    flex-direction: column;
    width: 67vw;
    align-items: flex-start;

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

      .startAndEnd {
      }
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
      padding: 15px 5px 10px 5px;
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

    .total{
      display: flex;
      align-self: flex-end;
      justify-content: flex-end;

      .total_cost{
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
export default class PayCheck extends Vue {
  data() {
    return {
      stayLength: 3,
      stayPlace: "PuJi Island"
    };
  }
}
</script>