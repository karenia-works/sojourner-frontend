<template>
  <div class="navbar">
    <div class="nav-left">
      <router-link to="/">
        <div class="nav-el logo">SOJOURNER</div>
      </router-link>
      <router-link to="/s">
        <div class="nav-el">Search</div>
      </router-link>
      <!-- <router-link to="/">
        <div class="nav-el">Explore</div>
      </router-link>-->
    </div>
    <div class="nav-right">
      <template v-if="!$store.state.userStore.hasProfile">
        <div class="nav-el" id="sign_up" @click="switchLogin" key="sign_in">Log in</div>
        <login :show.sync="showLogin" />
        <router-link to="/register" key="register">
          <div class="nav-el">Sign up</div>
        </router-link>
      </template>
      <template v-else>
        <div class="nav-el" @click.prevent="logout" key="logout">Logout</div>
        <router-link to="/u/me" key="me">
          <div class="nav-el">Hi, {{$store.state.userStore.profile.userName}}</div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.navbar {
  background: var(--color-bg-medium)
  flex-shrink: 0
  display: flex
  flex-direction: row
  justify-content: space-between
  padding: 16px
  padding-h: 24px
  height: 48px
  font-family: fonts-title
  font-size: font-sizes.body-larger
  user-select: none

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
import Login from "@/views/Login.vue";

@Component({ components: { Login } })
export default class Navbar extends Vue {
  showLogin: boolean = false;

  switchLogin() {
    this.showLogin = !this.showLogin;
  }

  get loggedIn(): boolean {
    return this.$store.state.userStore.loggedIn;
  }

  async logout() {
    this.$store.commit("logout");
    setTimeout(() => this.$router.push("/"), 500);
  }
}
</script>
