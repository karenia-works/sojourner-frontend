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
      <div>
        <button class="btn" @click="commit">finish</button>
        <div class="status">
          <div class="loading" v-if="loading">Please wait</div>
          <div class="err" v-if="error">{{error}}</div>
        </div>
      </div>
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
    signupDate: new Date(),
    role: "worker"
  };

  error: string | null = null;
  loading: boolean = false;

  async commit() {
    try {
      this.loading = true;
      this.error = null;
      await this.$store.dispatch("registerWorker", {
        username: this.u.email,
        password: this.password,
        profile: this.u
      });
      this.loading = false;
      // this.$router.push({ name: "home" });
    } catch (e) {
      this.loading = false;
      this.error = `${e.response.status}: ${e.response.data.error}`;
    }
  }

  inputCheck = {
    email: true,
    password: true,
    name: true,
    phone: true
  };

  @Watch("u.email")
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
  margin-v: spaces._6;
}

label:first-child {
  display: block;
  font-size: font-sizes.small-title;
  font-family: fonts-title;
}

label:first-child span {
  // color colors-admin.accent
  font-weight: 500;
}

textarea {
  width: 400px;
}

.input {
  margin-left: 0;
}

input.textErr {
  // background-color: var(--color-accent)
  color: colors.error;
}

.status {
  margin-v: spaces._3;
}

.err {
  font-weight: bold;
  color: var(--color-error);
}
</style>
