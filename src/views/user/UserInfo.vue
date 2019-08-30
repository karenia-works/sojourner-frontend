<template>
<div class="userInfo">
  <h1>Hello, {{profile.userName}}</h1>
  <div class="details">
    <p>{{profile.email}}</p>
    <p>{{profile.phoneNumber}}</p>
  </div>
  <!-- <div class="content"><a @click="logout">Logout</a></div> -->
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {Profile} from '@/models/Room.ts'

@Component({
  
})
export default class UserInfo extends Vue {
  @Prop() item!: Profile;
  profile: Profile = this.item;

  logout(){
    this.$store.commit("logout")
    this.$router.push("/")
  }
  
}
</script>

<style lang="stylus" scoped>
h1 {
  margin-bottom 0
}

.details {
  color colors.text-medium
  font-family fonts-title
  font-size 18px
  font-weight 450
  margin-top spaces._3
  margin-bottom  spaces._5
}

.details p {
  margin-v spaces._1
}
</style>

