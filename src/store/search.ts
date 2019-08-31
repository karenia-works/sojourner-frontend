import moment, { Moment } from 'moment'
import { ActionTree, MutationTree, GetterTree, Module, Dictionary } from 'vuex'
import { RootState } from './rootState'

export class SearchState {
  status: SearchStatus = new SearchStatus()
}
export type RoomType = 'single' | 'double' | 'quad'

export class SearchStatus {
  constructor(
    public keyword: string = '',
    public startTime: Moment = moment(),
    public endTime: Moment = moment(),
    public roomType: Set<RoomType> = new Set(['single', 'double', 'quad']),
    public useLongRent: boolean | null = null
  ) {}

  toDictionary(): Dictionary<string> {
    let dict: Dictionary<string> = {}
    if (this.keyword) dict['kw'] = this.keyword
    dict['startTime'] = this.startTime.format('YYYY-MM-DD')
    dict['endTime'] = this.endTime.format('YYYY-MM-DD')
    dict['roomType'] = Array.from(this.roomType.values()).join(' ')
    dict['useLongRent'] =
      this.useLongRent == null ? 'null' : this.useLongRent.toString()
    return dict
  }

  static fromDictionary(value: Dictionary<string>) {
    let keyword = value['kw'] || undefined
    let endTime = moment(value['endTime'] as string | undefined)
    let startTime = moment(value['startTime'] as string | undefined)
    let roomType = new Set((value['roomType'] || '').split(' ')) as Set<
      RoomType
    >
    let useLongRent =
      value['useLongRent'] == 'null'
        ? undefined
        : value['useLongRent'] == 'false'
        ? false
        : true

    let status = new SearchStatus(
      keyword,
      startTime,
      endTime,
      roomType,
      useLongRent
    )

    return status
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
