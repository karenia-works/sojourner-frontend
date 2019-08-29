import Vuex, { MutationTree, ActionTree, Store, Module, GetterTree } from 'vuex'
import { RootState } from './rootState'
import axios from 'axios'
import config from '@/config'
import qs from 'qs'

interface TokenContext {
  client_id: string
  client_secret: string
  grant_type:
    | 'authorization_code'
    | 'client_credentials'
    | 'password'
    | 'refresh_token'
    | 'urn:ietf:params:oauth:grant-type:device_code'
    | 'hashed_password'
  scope?: string
  redirect_uri?: string
  username?: string
  password?: string
  refresh_token?: string
  device_code?: string
}

export class UserData {
  constructor(public userId: string, public username: string) {}

  public updateFrom(data: UserLoginData) {
    // TODO
  }
}

interface UserLoginData {}

const formHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

export var getters: GetterTree<UserState, RootState> = {
  authHeader(state) {
    if (state.loggedIn) {
      return {}
    }
  }
}

export var actions: ActionTree<UserState, RootState> = {
  async loginUser(
    ctx,
    payload: {
      username: string
      password: string
      callback?: (finished: boolean) => void
    }
  ) {
    let { username, password } = payload
    let tokenCtx: TokenContext = {
      client_id: config.auth.client_id,
      client_secret: config.auth.client_secret,
      grant_type: 'password',
      username,
      password
    }

    console.log(tokenCtx)
    // return

    let loginData = await axios.post(
      config.backend.address + config.backend.tokenEndpoint,
      qs.stringify(tokenCtx),
      {
        headers: formHeaders
      }
    )

    let isLoginSuccessful = loginData.status >= 200 && loginData.status < 400

    let userData = await axios.get<UserData>(
      config.backend.address + config.backend.userEndpoint,
      {
        params: {
          username
        }
      }
    )

    if (payload.callback) {
      payload.callback(isLoginSuccessful)
    }

    ctx.commit('loggedInUser', userData)
  },
  registerUser(
    ctx,
    payload: {
      username: string
      password: string
      name: string
      phone: string
    }
  ) {
    // TODO
  }
}

export var mutations: MutationTree<UserState> = {
  updateUserData(state, s: UserData) {
    state.userData = s
    state.loggedIn = true
  },
  updateLoginData(state, d: UserLoginData) {
    // TODO
  }
}

export class UserState {
  loggedIn: boolean = false
  accessToken?: string
  userData?: UserData = undefined
  loginError?: any
}

export const userStore: Module<UserState, RootState> = {
  state: new UserState(),
  mutations,
  actions,
  getters
}
