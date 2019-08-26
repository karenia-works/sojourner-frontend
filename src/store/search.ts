import moment, { Moment } from 'moment'
import { ActionTree, MutationTree, GetterTree, Module, Dictionary } from 'vuex'
import { RootState } from './rootState'

export class SearchState {
  status: SearchStatus = new SearchStatus()
}
export type RoomType = 'single' | 'double' | 'quad'

export class SearchStatus {
  keyword: string = ''
  startTime: Moment = moment()
  endTime: Moment = moment()
  roomType: RoomType[] = []
  useLongRent: boolean | null = null

  toDictionary(): Dictionary<string> {
    return {
      kw: this.keyword,
      startTime: this.startTime.unix().toString(),
      endTime: this.endTime.unix().toString(),
      roomType: this.roomType.join('+'),
      useLongRent:
        this.useLongRent == null ? 'null' : this.useLongRent.toString()
    }
  }

  static fromDictionary(value: Dictionary<string>) {
    let status = new SearchStatus()
    status.keyword = value['kw']
    status.endTime = moment(parseInt(value['endTime']))
    status.startTime = moment(parseInt(value['startTime']))
    status.roomType = value['roomType'].split('+') as RoomType[]
    status.useLongRent =
      value['useLongRent'] == 'null'
        ? null
        : value['useLongRent'] == 'false'
        ? false
        : true
  }
}

const actions: ActionTree<SearchState, RootState> = {}

const mutations: MutationTree<SearchState> = {
  replaceSearch(state, newState: SearchStatus) {
    state.status = newState
  }
}

const getters: GetterTree<SearchState, RootState> = {}

export const searchStore: Module<SearchState, RootState> = {
  state: () => new SearchState(),
  actions,
  mutations,
  getters
}
