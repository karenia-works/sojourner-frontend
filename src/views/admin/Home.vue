<template>
  <div class="home">
    <div class="container">
      <div class="jumbotron">
        <h1>Welcome, Mr. Administrator</h1>
        <p>Where would you like to get started today?</p>
      </div>
    </div>
    <!-- <div class="background color-darker">
      <div class="container">
        <h1>Short stay or long rent, we've got you covered!</h1>
      </div>
    </div>-->
  </div>
</template>

<style lang="stylus" scoped>
.jumbotron {
  margin-top: spaces._8;
  margin-bottom: spaces._8;
  text-align: left;

  p {
    font-weight: 500;
    font-size: font-sizes.body-larger;
  }

  h1 {
    margin-v: spaces._3;
    text-transform: capitalize;
  }

}

  .choose_btn {
    height: spaces._8;
  }
.index-img {
  +break-screen(breakpoints.medium, 0) {
    position: absolute;
    right: 0px;
    width: 640px;
  }

  +break-screen(0, breakpoints.medium) {
    margin-right: -(spaces._3);
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {}
</script>
