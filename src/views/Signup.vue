<template>
  <div class="container">
    <div class="Signup">
      <h1>nice to meet you.</h1>
      <div class="form">
        <div class="item">
          <label for="email">
            <span>Email address</span> - also your login name
          </label>
          <input
            type="email"
            class="input"
            id="email"
            placeholder="email address"
            v-model.trim="u.email"
            :class="{textErr: !inputCheck.email}"
            autofocus
          />
        </div>

        <div class="item">
          <label for="password">Set a password</label>
          <input
            type="password"
            class="input"
            id="password"
            placeholder="password"
            v-model="password"
          />
        </div>

        <div class="item">
          <label for="name">
            <span>User name</span> - will display to others
          </label>
          <input type="text" class="input" id="name" placeholder="name" v-model.trim="u.userName" />
        </div>

        <div class="item">
          <label for="description">
            How to
            <span>contact</span> you?
          </label>
          <input
            type="tel"
            class="input"
            id="phone"
            placeholder="phone number"
            v-model.trim="u.phoneNumber"
            :class="{textErr: !inputCheck.phone}"
          />
        </div>

        <div class="item type">
          <label>
            Your
            <span>gender</span> please?
          </label>
          <Radio :values="['M', 'F']" :texts="['Male', 'Female']" :roomType.sync="u.sex"></Radio>
        </div>
      </div>
      <button class="btn" @click="commit">finish</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import { Profile } from "@/models/Room.ts";
import Checkbox from "@/components/Checkbox.vue";
import Radio from "@/components/Radio.vue";
import config from "@/config.ts";
import axios from "axios";

@Component({
  components: {
    Radio
  }
})
export default class Signup extends Vue {
  genders: Array<string> = ["Male", "Female"];

  password: string = "";

  u: Profile = {
    id: "",
    userName: "",
    email: "",
    phoneNumber: "",
    sex: "U",
    avatar: "",
    signupDate: new Date()
  };

  async commit() {
    await this.$store.dispatch("registerUser", {
      username: this.u.email,
      password: this.password
    });

    await this.$store.dispatch("loginUser", {
      email: this.u.email,
      password: this.password
    });

    let result = await axios.post(
      config.backend.address + config.backend.ProfileEndpoint,
      this.u,
      {
        headers: {
          Authorization: `Bearer ${this.$store.state.userLoginData.access_token}`
        }
      }
    );

    console.log(result);

    this.$router.push({ name: "home" });
  }

  inputCheck = {
    email: true,
    password: true,
    name: true,
    phone: true
  };

  @Watch("account.username")
  onEmailChanged(val: string, oldVal: string) {
    if (val) this.inputCheck.email = this.patterns.email.test(val);
    else this.inputCheck.email = true;
  }

  @Watch("u.phoneNumber")
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
.item {
  margin-v: spaces._6
}

label:first-child {
  display: block
  font-size: font-sizes.small-title
  font-family: fonts-title
}

label:first-child span {
  // color colors-admin.accent
  font-weight: 500
}

textarea {
  width: 400px
}

.input {
  margin-left: 0
}

input.textErr {
  // background-color: var(--color-accent)
  color: colors.error
}
</style>
