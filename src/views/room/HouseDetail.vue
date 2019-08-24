<template>
  <div class="houseDetail">
      <div class="houseBigPic">
        <img alt="housePic" src="../../assets/house_big_pic.jpg" />
        <img alt="coachPic" src="../../assets/coach.jpg" />
        <img alt="tablePic" src="../../assets/table.jpg" />
      </div>
    <div class="container">
      <div class="aboutHouse">
        <div class="houseInfo">
          <div class="titleWords">
            <label class="info">YOUR BEST CHOICE IN THE WORLD!</label>
          </div>
          <div class="advWords">
            <label class="info intro">Great Location</label>
            <label class="info">37 XueYuan Road</label>
            <label class="info">XiCheng, BeiJing</label><br>
            <label class="info intro">Entire House</label>
            <label class="info">7 guests, 3 bedrooms, 7 beds, 3 baths</label><br>
            <label class="info intro">Complete Facilities</label>
            <label class="info">Golf course, Hot Spring, Bar My hand is a <hook-icon /></label><br>
          </div>
          <hr align=center width=100% SIZE=1>
        </div>
        
        <div class="bookInfo">
          <label class="book">$450</label><br><br>
          <label class="book">Date</label><br><br>
          <label class="book">Room Type</label><br><br>
          <label class="book">Time Length</label>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.houseBigPic img{
  height :33vw
  // width :33vw
}
.houseBigPic{
  display : flex
  flex-direction: row
  justify-content: center
  align-items:center
  width :100%
  flex: 1
  overflow-x: auto
}

.aboutHouse{
  display:flex
  justify-content:center
  flex-direction:row
  align-items:flex-start
  padding: 16px

  .houseInfo{
    padding: 36px
    display: flex
    align-items: stretch
    flex-direction:column
    width :67vw
    align-items:flex-start
    
    .info{
      padding: 5px
      display: flex
      align-items: stretch
      flex-direction:column
      align-items:flex-start
      height 100px
    }

    .intro{
      font-weight:bolder
    }

    .titleWords{
      font-weight:bolder
      font-size: 30px
      padding: 36px 0px 36px 0px
    }
  }

  .bookInfo{
    padding: 36px
    display: flex
    position: sticky
    top: 10px
    align-items: stretch
    flex-direction:column
    width :33vw

    border-style: solid
    border-width:1px
  }
}

</style>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HookIcon from 'mdi-vue/Hook' // works without an extension too

@Component({
  components: {
    HookIcon,
  }
})
export default class Home extends Vue {}
</script>
