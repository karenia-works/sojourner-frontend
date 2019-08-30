<template>
  <div v-if="showLogin">
    <div class="cover" @click="closeLogin"></div>
    <div class="login loginWindow">
      <input
        type="email"
        class="input"
        id="email"
        placeholder="email address"
        v-model.trim="email"
        :class="{textErr: !inputCheck.email}"
        autofocus
      />
      <input type="password" class="input" id="password" placeholder="password" v-model="password" />
      <div class="btnDiv">
        <button id="login-btn" class="btn" @click="submitLogin">Login</button>
      </div>
      <p class="signupLink">
        Don't have an account?&nbsp;
        <span class="jumpLink" @click="closeLogin"><router-link to="/register">Sign up</router-link></span> now
      </p>
    </div>
    <!-- <div class="signup loginWindow" v-if="signup">
      <input
        type="email"
        class="input"
        id="email"
        placeholder="email address"
        v-model.trim="email"
        :class="{textErr: !inputCheck.email}"
        autofocus
      />
      <input type="password" class="input" id="password" placeholder="password" v-model="password" />
      <input type="text" class="input" id="name" placeholder="full name" v-model.trim="name" />
      <input
        type="tel"
        class="input"
        id="phone"
        placeholder="phone number"
        v-model.trim="phone"
        :class="{textErr: !inputCheck.phone}"
      />
      <div class="btnDiv">
        <button id="login-btn" class="btn" @click="submitSignup">Signup</button>
      </div>
      <p class="signupLink">
        Already have an account?&nbsp;
        <span class="jumpLink" @click="toLogin">Log in</span>
      </p>
    </div> -->
  </div>
</template>

<style lang="stylus" scoped>
.cover {
  height: 100%
  width: 100%
  position: absolute
  top: 0
  left: 0
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 8
}

.loginWindow {
  width: 400px
  background-color: var(--color-bg-light)
  border-radius: 5px
  position: absolute
  left: 50%
  margin-left: -200px
  z-index: 9
  display: flex
  flex-direction: column
  align-items: center
  padding: spaces._6
}

.login {
  top: 25%
}

.signup {
  top: 15%
}

.btnDiv {
  height: 40px
  margin-top: 15px
  margin-bottom: 10px
}

.loginWindow input {
  width: 100%
  margin-v: spaces._3
}

input.textErr {
  background-color: var(--color-accent)
}

.signupLink {
  color: var(--color-text-medium)
}

.jumpLink {
  text-decoration: none
  color: var(--color-accent)
}

.jumpLink:hover {
  cursor pointer
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
  @PropSync("show", { default: false, type: Boolean })
  showLogin!: boolean;

  @Prop({ default: false }) isSinglePage!: boolean;

  openLogin() {
    this.showLogin = true;
  }
  closeLogin() {
    this.showLogin = false;
  }

  inputCheck = {
    email: true,
    password: true,
    name: true,
    phone: true
  };

  @Watch("email")
  onEmailChanged(val: string, oldVal: string) {
    if (val) this.inputCheck.email = this.patterns.email.test(val);
    else this.inputCheck.email = true;
  }

  @Watch("phone")
  onPhoneChanged(val: string, oldVal: string) {
    if (val) this.inputCheck.phone = this.patterns.phone.test(val);
    else this.inputCheck.phone = true;
  }

  patterns = {
    email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    phone: /^1[3456789]\d{9}$/
  };

  email = "";
  password = "";
  name = "";
  phone = "";

  async submitLogin() {
    var check = this.inputCheck;
    if (!check.email) {
      alert("Please check your email address");
    } else {
      await this.$store.dispatch("loginUser", {
        email: this.email,
        password: this.password
      });

      this.showLogin=false;

      if(this.$store.state.role == "admin"){
        this.$router.push("/admin")
      }
    }
  }
}
</script>
