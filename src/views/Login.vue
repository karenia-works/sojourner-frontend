<template>
    <div v-if="showLogin">
      <div class="cover"  @click="closeLogin"></div>
      <div class="login loginWindow" v-if="!signup">
        <!-- <close-icon class="close" @click="closeLogin"/> -->
        <input type="email" class="input" id="email" placeholder="email address" v-model.trim="email" :class="{textErr: !inputCheck.email}" autofocus />
        <input type="password" class="input" id="password" placeholder="password" v-model="password" />
        <div class="btnDiv">
          <button id="login-btn" class="btn ">Login</button>
        </div>
        <p class="signupLink">
            Don't have an account?&nbsp;
            <span class="jumpLink" @click="toSignup">Sign up</span> now
        </p>
      </div>
      <div class="signup loginWindow" v-if="signup">
        <!-- <close-icon class="close" @click="closeLogin"/> -->
        <input type="email" class="input" id="email" placeholder="email address" v-model.trim="email" :class="{textErr: !inputCheck.email}" autofocus />
        <input type="password" class="input" id="password" placeholder="password" v-model="password" />
        <input type="text" class="input" id="name" placeholder="full name" v-model.trim="name" />
        <input type="tel" class="input" id="phone" placeholder="phone number" v-model.trim="phone" :class="{textErr: !inputCheck.phone}" />
        <div class="btnDiv">
          <button id="login-btn" class="btn ">Signup</button>
        </div>
        <p class="signupLink">
            Already have an account?&nbsp;
            <span class="jumpLink" @click="toLogin">Log in</span>
        </p>
      </div>
    </div>
</template>

<style lang="stylus" scoped>
.cover {
  height 100%
  width 100%
  position absolute
  top 0
  left 0
  background-color rgba(0, 0, 0, 0.5)
  z-index 8
}

.loginWindow {
  width 400px
  background-color colors.bg-light
  border-radius 5px   

  position absolute 
  left 50%
  margin-left -200px
  z-index 9

  display flex
  flex-direction column
  // justify-content center
  align-items center
  padding spaces._6
}

.login {
  top 25%
}

.signup {
  top 15%
}

.btnDiv {
  height 40px
  margin-top 15px
  margin-bottom 10px
}

.loginWindow input {
  width: 100%
  margin-v: spaces._3
}

input.textErr {
  // color: colors.error
  background-color colors.accent
}

.signupLink {
  color colors.text-medium
}

.jumpLink {
  text-decoration none 
  color: colors.accent
}

</style>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import RoomInfo from "@/components/RoomInfo.vue"; // @ is an alias to /src

@Component({
  components: {
    // CloseIcon
  }
})
export default class Login extends Vue {
@PropSync('show', {default: false, type: Boolean})
showLogin!:boolean;
signup = false;

openLogin() {
  this.showLogin = true;
}
closeLogin() {
  this.showLogin = false;
}
toLogin() {
  this.signup = false;
  this.inputCheck.name = true;
  this.inputCheck.phone = true;
}
toSignup() {
  this.signup = true;
  if (this.phone)
    this.inputCheck.phone = this.patterns.phone.test(this.phone);
}

inputCheck = {
  email: true,
  password: true,
  name: true,
  phone: true
}

@Watch('email')
onEmailChanged(val: string, oldVal: string) {
  if (val)
    this.inputCheck.email = this.patterns.email.test(val);
}

@Watch('phone')
onPhoneChanged(val: string, oldVal: string) {
  if (val)
    this.inputCheck.phone = this.patterns.phone.test(val);
}

patterns = {
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  phone: /^1[3456789]\d{9}$/
}

email = '';
password = '';
name = '';
phone = '';

}
</script>