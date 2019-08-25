<template>
  <div class="navbar">
    <div class="nav-left">
      <div class="nav-el logo">SOJOURNER</div>
      <div class="nav-el">Search</div>
      <div class="nav-el">Explore</div>
    </div>
    <div class="nav-right">
      <div class="nav-el" id="sign_up">Sign up</div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.navbar {
  background: colors.bg-medium
  display: flex
  flex-direction: row
  justify-content: space-between
  padding: 16px
  padding-h: 24px
  height: 48px
  font-family: fonts-title
  font-size: font-sizes.body-larger

  .nav-left {
    display: flex
    flex-direction: row
    align-items: stretch
  }

  .nav-right {
    display: flex
    flex-direction: row
    align-items: stretch
  }

  .nav-el {
    display: flex
    align-items: center
    margin-h: 8px
    padding-h: 16px
  }
}

.logo {
  font-weight: bold
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Navbar extends Vue {}
</script>
