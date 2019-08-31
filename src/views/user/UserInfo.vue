<template>
<div class="userInfo">
  <h1>Hello, {{profile.userName}}</h1>
  <button @click="openUpdate" class="btn">change profile</button>
  <UpdateUser :user="profile" :show.sync="showUpdate"></UpdateUser>
  <div class="details">
    <p>{{profile.email}}</p>
    <p>{{profile.phoneNumber}}</p>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {Profile} from '@/models/Room.ts'
import UpdateUser from "@/views/forms/UpdateUser.vue";

@Component({
  components: {
    UpdateUser
  }
})
export default class UserInfo extends Vue {
  @Prop() profile!: Profile;
  showUpdate: boolean = false;  
  openUpdate(): void {
    this.showUpdate = true;
  }
}
</script>

<style lang="stylus" scoped>
h1 {
  margin-bottom 0
}
.btn {
  float right
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

