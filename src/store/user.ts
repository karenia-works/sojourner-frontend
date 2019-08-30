import Vuex, { MutationTree, ActionTree, Store, Module, GetterTree } from 'vuex'
import { RootState } from './rootState'
import axios from 'axios'
import config from '@/config'
import qs from 'qs'
import { Profile } from '@/models/Room'
import { getProfileId, updateProfile } from '@/helpers/profileHelper'

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

// {
//   username: string
//   password: string
//   role: "IdentityServerApi"
//   id: null
//   key: null
// }

export class UserData {
  constructor(public username: string) { }

  public updateFrom(data: UserLoginData) {
    // TODO
  }
}

interface UserLoginData {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
}

const formHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

export var getters: GetterTree<UserState, RootState> = {
  authHeader(state) {
    if (state.loggedIn && state.userLoginData) {
      return {
        Authorization: `Bearer ${state.userLoginData.access_token}`
      }
    }
    else
      return { _: undefined };
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

    ctx.commit('updateLoginData', { data: loginData.data, email })
    ctx.commit('tryStoreData')

    if (payload.callback) {
      payload.callback(isLoginSuccessful)
    }
  },
  async updateProfile(ctx) {
    if (!ctx.state.email) throw new Error('Not logged in')
    let profile = await getProfileId(ctx.state.email, ctx.getters.authHeader)

    console.log(
      await axios.get(config.backend.address + 'user/me', {
        headers: ctx.getters.authHeader
      })
    )

    ctx.commit('updateUserData', profile)
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
    state.profile = s
    state.loggedIn = true
  },
  updateLoginData(state, data: { data: UserLoginData; email: string }) {
    state.userLoginData = data.data
    state.email = data.email
    state.loggedIn = true
  },
  tryResolveData(state, window: Window) {
    let header = window.localStorage.getItem('auth')
    let scope = window.localStorage.getItem('auth_scope') || 'identityServerApi'
    if (header && scope) {
      state.userLoginData = {
        access_token: header,
        expires_in: 0,
        token_type: 'Bearer',
        scope
      }
    }
  },
  tryStoreData(state) {
    if (state.userLoginData) {
      window.localStorage.setItem('auth', state.userLoginData.access_token)
      window.localStorage.setItem('auth_scope', state.userLoginData.scope)
    }
  }
}

export class UserState {
  loggedIn: boolean = false
  userLoginData?: UserLoginData
  email?: string
  profile?: Profile
  loginError?: any
}

export const userStore: Module<UserState, RootState> = {
  state: new UserState(),
  mutations,
  actions,
  getters
}
