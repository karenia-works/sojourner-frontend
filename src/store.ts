import Vue from 'vue'
import Vuex, { MutationTree, ActionTree } from 'vuex'
import { userStore } from '@/store/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore
  }
})
