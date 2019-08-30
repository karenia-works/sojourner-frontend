import Vuex, { MutationTree, ActionTree, Store, Module, GetterTree } from 'vuex'
import { RootState } from './rootState'
import axios from 'axios'
import config from '@/config'
import qs from 'qs'
import { Profile } from '@/models/Room'

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
  constructor(public username: string) {}

  public updateFrom(data: UserLoginData) {
    // TODO
  }
}

interface UserLoginData {
  access_token: string
  expires_in: number
  token_type: string
  scope: 'IdentityServerApi' | 'admin' | 'worker'
}

const formHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

export var getters: GetterTree<UserState, RootState> = {
  authHeader(state) {
    if (state.userLoginData) {
      return {
        Authorization: `Bearer ${state.userLoginData.access_token}`
      }
    }
  }
}

export var actions: ActionTree<UserState, RootState> = {
  async loginUser(
    ctx,
    payload: {
      email: string
      password: string
      callback?: (finished: boolean) => void
    }
  ) {
    let { email: email, password } = payload
    let tokenCtx: TokenContext = {
      client_id: config.auth.client_id,
      client_secret: config.auth.client_secret,
      grant_type: 'password',
      username: email,
      password
    }

    let loginData = await axios.post<UserLoginData>(
      new URL(config.backend.tokenEndpoint).href,
      qs.stringify(tokenCtx),
      {
        headers: formHeaders
      }
    )

    let isLoginSuccessful = loginData.status >= 200 && loginData.status < 400
    if (!isLoginSuccessful) return

    ctx.commit('updateLoginData', loginData.data)

    let userData = await axios.get<UserData>(
      config.backend.address + config.backend.userEndpoint,
      {
        headers: ctx.state.userLoginData
      }
    )

    if (payload.callback) {
      payload.callback(isLoginSuccessful)
    }

    ctx.commit('updateUserData', userData.data)
  },
  async registerUser(
    ctx,
    payload: {
      username: string
      password: string
      name: string
      phone: string
    }
  ) {
    let result = await axios.post(
      new URL(config.backend.userEndpoint, config.backend.address).href,
      {
        username: payload.username,
        password: payload.password,
        role: 'IdentityServerApi',
        id: null,
        key: null
      }
    )
  }
}

export var mutations: MutationTree<UserState> = {
  updateUserData(state, s: Profile) {
    state.userData = s
    state.loggedIn = true
  },
  updateLoginData(state, d: UserLoginData) {
    state.userLoginData = d
  }
}

export class UserState {
  loggedIn: boolean = false
  userLoginData?: UserLoginData
  userData?: Profile
  loginError?: any
}

export const userStore: Module<UserState, RootState> = {
  state: new UserState(),
  mutations,
  actions,
  getters
}
