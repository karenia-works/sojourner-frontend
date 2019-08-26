import Vuex, { MutationTree, ActionTree, Store, Module, GetterTree } from 'vuex'
import { RootState } from './rootState'
import axios from 'axios'
import config from '@/config'
import qs from 'qs'
import { Room } from '@/models/Room'

export class RoomBufferState {
  buffer: Map<string, Room> = new Map()
  lru: Map<string, number> = new Map()
}

export var getters: GetterTree<RoomBufferState, RootState> = {
  getRoomById(state, rootState) {
    return (id: string): Room | undefined => {
      state.lru.set(id, Date.now())
      return state.buffer.get(id)
    }
  }
}
export var actions: ActionTree<RoomBufferState, RootState> = {
  async addRoom(state, id: string) {
    let roomData = await axios.get<Room>(
      config.backend.address + config.backend.roomEndpoint(id)
    )
    if (roomData.status >= 200 && roomData.status < 300) {
      let room = roomData.data
      state.commit('setRoom', { id, room })
    } else {
      throw new Error(
        `Cannot add room! status: ${roomData.status}; ${roomData.statusText}`
      )
    }
  },

  async assureRoomAvailability(state, id: string) {
    let isRoomPresent = state.state.buffer.has(id)
    if (!isRoomPresent) {
      // Room is not present, async get from backend
      await state.dispatch('addRoom', id)
    }
  }
}
export var mutations: MutationTree<RoomBufferState> = {
  setRoom(state, payload: { id: string; room: Room }) {
    state.buffer.set(payload.id, payload.room)
    state.lru.set(payload.id, Date.now())
  },
  setRoomLru(state, id: string) {
    state.lru.set(id, Date.now())
  }
}

export const roomStore: Module<RoomBufferState, RootState> = {
  state: () => new RoomBufferState(),
  actions,
  mutations
}
