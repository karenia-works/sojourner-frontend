import Vuex, { MutationTree, ActionTree, Store, Module, GetterTree } from 'vuex'
import { RootState } from './rootState'
import axios from 'axios'
import config from '@/config'
import qs from 'qs'
import { Room, Order } from '@/models/Room'

class OrderBufferState {
  buffer: Map<string, Order> = new Map()
  lru: Map<string, number> = new Map()
}

export var getters: GetterTree<OrderBufferState, RootState> = {
  getRoomById(state, rootState) {
    return (id: string) => {
      state.buffer.get(id)
      state.lru.set(id, Date.now())
    }
  }
}
export var actions: ActionTree<OrderBufferState, RootState> = {
  async addOrder(state, id: string) {
    let orderData = await axios.get<Room>(
      config.backend.address + config.backend.roomEndpoint(id)
    )
    if (orderData.status >= 200 && orderData.status < 300) {
      let room = orderData.data
      state.commit('setOrder', { id, room })
    } else {
      throw new Error(
        `Cannot add order! status: ${orderData.status}; ${orderData.statusText}`
      )
    }
  },

  async assureOrderAvailability(state, id: string) {
    let isRoomPresent = state.state.buffer.has(id)
    if (!isRoomPresent) {
      // Room is not present, async get from backend
      await state.dispatch('addOrder', id)
    }
  }
}
export var mutations: MutationTree<OrderBufferState> = {
  setOrder(state, payload: { id: string; order: Order }) {
    state.buffer.set(payload.id, payload.order)
    state.lru.set(payload.id, Date.now())
  },
  setOrderLru(state, id: string) {
    state.lru.set(id, Date.now())
  }
}

export const orderStore: Module<OrderBufferState, RootState> = {
  state: () => new OrderBufferState(),
  actions,
  mutations
}
