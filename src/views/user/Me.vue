<template>
  <div class="me">
    <div
      class="title-pic"
      v-if="$store.state.userStore.profile && $store.state.userStore.profile.avatar"
    >
      <div class="background"></div>
      <div class="container">
        <img :src="$store.state.userStore.profile.avatar" alt="avatar" class="pic" />
      </div>
    </div>
    <div class="container">
      <template v-if="$store.state.userStore.loggedIn">
        <userInfo
          class="userInfo"
          :profile="$store.state.userStore.profile"
          v-if="$store.state.userStore.profile && profile"
        ></userInfo>
        <div class="issueBtn">
          <router-link to>
            <button class="btn">my issues</button>
          </router-link>
        </div>
        <Orders></Orders>
      </template>
      <template v-else>
        <h1>You are not logged in!</h1>
      </template>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container {
  display: flex
  flex-direction: column
}

.issueBtn {
  height: 40px
}

.btn {
  float: right
  // display inline
}

.title-pic {
  .background {
    background: var(--color-bg-medium)
    height: 22vh
    min-height: 256px
  }

  .pic {
    margin-top: -18vh
    height: 256px
    width: 256px
    box-shadow: 0px 16px 24px var(--color-bg-medium)
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Orders from "@/views/user/Orders.vue";
import UserInfo from "@/views/user/UserInfo.vue";
import { Order } from "@/models/Room.ts";
import { Profile } from "@/models/Room.ts";
import { findOrderByUser } from "@/helpers/orderHelper.ts";
import config from "@/config.ts";
import axios from "axios";

@Component({
  components: {
    Orders,
    UserInfo
  }
})
export default class Me extends Vue {
  profile: Profile | boolean = false;

  async mounted() {
    await this.$store.dispatch("updateProfile");
    this.profile = this.$store.state.userStore.profile;
  }

  beforeEnter(from, to, next) {
    next((vm: Vue) => {
      if (!vm.$store.state.userStore.loggedIn) next(false);
      else next();
    });
  }
}
</script>
