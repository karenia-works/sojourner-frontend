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
    public roomType: RoomType[] = [],
    public useLongRent: boolean | null = null
  ) {}

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

  static fromDictionary(value: Dictionary<string | null>) {
    let keyword = value['kw'] || undefined
    let endTime = value['endTime']
      ? moment.unix(parseInt(value['endTime'] as string))
      : undefined
    let startTime = value['startTime']
      ? moment.unix(parseInt(value['startTime'] as string))
      : undefined
    let roomType = (value['roomType'] || '').split('+') as RoomType[]
    let useLongRent =
      value['useLongRent'] == 'null'
        ? undefined
        : value['useLongRent'] == 'false'
        ? false
        : true

    let status = new SearchStatus(
      keyword,
      endTime,
      startTime,
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
