import Vue from 'vue'
import Vuex, { MutationTree, ActionTree } from 'vuex'
import { userStore } from '@/store/user'
import { orderStore } from '@/store/order'
import { roomStore } from '@/store/room'
import { searchStore } from '@/store/search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    searchStore,
    userStore,
    orderStore,
    roomStore
  }
})
