<template>
  <div class="navbar">
    <div class="nav-left">
      <router-link to="/admin">
        <div class="nav-el logo">SOJOURNER</div>
      </router-link>
      <router-link to="/admin/manageUser">
        <div class="nav-el">User List</div>
      </router-link>
      <router-link to="/admin/ManageOrder">
        <div class="nav-el">Orders</div>
      </router-link>
      <router-link to="/admin/ManageRoom">
        <div class="nav-el">Rooms</div>
      </router-link>
      <router-link to="/admin/ManageIssue">
        <div class="nav-el">Repair Issue</div>
      </router-link>
    </div>
    <div class="nav-right">
      <div class="nav-el" id="sign_up" @click="switchLogin()">Sign up</div>
      <login :show.sync="showLogin" />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.navbar {
  background: var(--color-bg-medium)
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
import Login from "@/views/Login.vue";

@Component({ components: { Login } })
export default class Navbar extends Vue {
  showLogin: boolean = false;

  switchLogin() {
    this.showLogin = !this.showLogin;
  }
}
</script>
