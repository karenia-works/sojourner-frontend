<template>
  <div>
    <button @click="openLogin">login</button>
    <template v-if="showLogin">
      <div class="cover"  @click="closeLogin"></div>
      <div class="login">
        <!-- <close-icon class="close" @click="closeLogin"/> -->
        <input type="text" class="input" id="email" placeholder="email address" v-model.trim="email" />
        <input type="password" class="input" id="password" placeholder="password" v-model="password" />
        <div class="btnDiv">
          <button id="login-btn" class="btn ">Login</button>
        </div>
        <p class="signup">
            Don't have an account? 
            <a href="/register" class="signupLink">Sign up</a> now
        </p>
      </div>
    </template>
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

.login {
  // height 300px
  width 400px
  background-color colors.bg-light
  border-radius 5px   

  position absolute 
  top 25%
  left 50%
  margin-left -200px
  z-index 9

  display flex
  flex-direction column
  // justify-content center
  align-items center
  padding spaces._6
}

.btnDiv {
  height 40px
  margin-top 15px
  margin-bottom 10px
}

.signup {
  color colors.text-medium
}

.signupLink {
  text-decoration none 
  color: colors.accent
}

#email, #password{
  width: 100%
  margin-v: spaces._3
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RoomInfo from "@/components/RoomInfo.vue"; // @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";

// import CloseIcon from 'mdi-vue/Close'

@Component({
  components: {
    // CloseIcon
  }
})
export default class Search extends Vue {
  showLogin = true;
  openLogin() {
    this.showLogin = true;
  }
  closeLogin() {
    this.showLogin = false;
  }

  email = '';
  password = '';

}
</script>