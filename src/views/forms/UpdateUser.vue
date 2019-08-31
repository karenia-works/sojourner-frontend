<template>
<div class="updateUser" v-if="showWindow">
  <div class="cover" @click="closeWindow"></div>
  <div class="updateWindow">
    <h2>update profile</h2>
    <div class="form">
      <div class="item">
        <label for="email">Email address <span> (fixed)</span></label>
        <input
          type="email" class="input" id="email"
          disabled
          v-model.trim="user.email"
        />
      </div>

      <div class="item">
        <label for="name">Nickname</label>
        <input type="text" class="input" id="name" placeholder="name" v-model.trim="user.userName" />
      </div>

      <div class="item">
        <label for="description">Phone number</label>
        <input
          type="tel" class="input" id="phone"
          placeholder="phone number"
          v-model.trim="user.phoneNumber"
          :class="{textErr: !inputCheck.phone}"
        />
      </div>

      <div class="item type">
        <label>Gender</label>
        <Radio :values="['M', 'F']" :texts="['Male', 'Female']" 
          :roomType.sync="user.sex" class="radio"></Radio>
      </div>
    </div>
    <button class="btn" @click="commit">confirm</button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import {Profile} from "@/models/Room.ts";
import Checkbox from "@/components/Checkbox.vue";
import Radio from "@/components/Radio.vue";
import config from "@/config.ts"
import axios from 'axios';

@Component({
  components: {
    Radio
  }
})
export default class updateUser extends Vue{
  @PropSync("show", { default: false, type: Boolean })
  showWindow!: boolean;
  @Prop() user!: Profile;
  
  uid: string | boolean = false;

  // async mounted() {
  //   }

  async getUid() {
    let response = await axios
      .get(config.backend.address + `user/byEmail/` + this.user.email, {
        headers: this.$store.getters.authHeader
      })
      console.log(response)
      this.uid = response.data.id;
      console.log("get uid:" + this.uid)

  }

  async commit(){
    let role: string = this.$store.state.userStore.role;
    let result;
    if (role == "admin") {
      await this.getUid();
      result = await axios.put(
        config.backend.address+`profile/`+this.uid,
        this.user,
        {headers: this.$store.getters.authHeader}
      )
    } else {
      result = await axios.put(
        config.backend.address+`profile/`,
        this.user,
        {headers: this.$store.getters.authHeader}
      )
    }
    let success = result.status == 201
    alert("changes committed")
    this.closeWindow();
  }


  inputCheck = {
    name: true,
    phone: true
  };

  closeWindow(): void {
    this.showWindow = false;
  }

  @Watch("user.phoneNumber")
  onPhoneChanged(val: string, oldVal: string) {
    if (val) this.inputCheck.phone = this.patterns.phone.test(val);
    else this.inputCheck.phone = true;
  }

  patterns = {
    email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    phone: /^1[3456789]\d{9}$/
  };

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

.updateWindow {
  width: 400px
  background-color: var(--color-bg-light)
  border-radius: 5px
  position: fixed
  left: 50%
  top: 20%
  margin-left: -200px
  z-index: 9
  display: flex
  flex-direction: column
  align-items: center
  padding: spaces._6
}

.item {
  margin-v spaces._6
}

label:first-child {
  display inline-block
  font-family fonts-title
  font-size font-sizes.body-larger
}

label:first-child span {
  font-size font-sizes.body
  color colors.text-medium
}

.input {
  // font-size font-sizes.body-larger
  margin-left spaces._2
}

input.textErr {
  color colors.error
}

</style>