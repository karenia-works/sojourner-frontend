import Vuex, { MutationTree, ActionTree, Store, Module, GetterTree } from 'vuex'
import { RootState } from './rootState'
import axios from 'axios'
import config from '@/config'
import qs from 'qs'
import { Profile } from '@/models/Room'
import { getMyProfile, updateProfile } from '@/helpers/profileHelper'

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
  constructor(public username: string) {}

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
  'Content-Type': 'application/x-www-form-urlencoded',
}

export var getters: GetterTree<UserState, RootState> = {
  authHeader(state) {
    if (state.loggedIn && state.userLoginData) {
      return {
        Authorization: `Bearer ${state.userLoginData.access_token}`,
      }
    } else return undefined
  },
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
      password,
    }

    let loginData = await axios.post<UserLoginData>(
      new URL(config.backend.tokenEndpoint).href,
      qs.stringify(tokenCtx),
      {
        headers: formHeaders,
      }
    )

    let isLoginSuccessful = loginData.status >= 200 && loginData.status < 400
    if (!isLoginSuccessful) return

    ctx.commit('updateLoginData', { data: loginData.data, email })

    await ctx.dispatch('updateProfile')

    ctx.commit('tryStoreData')

    let meData = await axios.get(
      new URL('user/me', config.backend.address).href,
      {
        headers: {
          Authorization: `Bearer ${loginData.data.access_token}`,
        },
      }
    )

    ctx.state.role = meData.data.role

    if (payload.callback) {
      payload.callback(isLoginSuccessful)
    }
  },
  async updateProfile(ctx) {
    if (!ctx.state.email || !ctx.state.userLoginData)
      throw new Error('Not logged in')
    try {
      let profile = await getMyProfile(ctx.getters.authHeader)
      ctx.commit('updateUserData', profile)
    } catch (e) {
      ctx.commit('logout')
    }
  },
  async registerUser(
    ctx,
    payload: {
      username: string
      password: string
    }
  ) {
    let result = await axios.post(
      new URL(config.backend.userEndpoint, config.backend.address).href,
      {
        username: payload.username,
        password: payload.password,
        role: 'IdentityServerAccessToken',
        id: null,
        key: null,
      }
    )
  },
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
  tryRestoreData(state) {
    let email = window.localStorage.getItem('email') || ''
    let profile = JSON.parse(window.localStorage.getItem('profile') || '')
    let authData = JSON.parse(window.localStorage.getItem('authData') || '')
    if (email && profile && authData) {
      state.email = email
      state.profile = profile
      state.userLoginData = authData
      state.loggedIn = true
    }
  },
  tryStoreData(state) {
    if (state.userLoginData && state.email) {
      window.localStorage.setItem(
        'authData',
        JSON.stringify(state.userLoginData)
      )
      window.localStorage.setItem('profile', JSON.stringify(state.profile))
      window.localStorage.setItem('email', state.email)
    }
  },
  logout(state) {
    state.userLoginData = undefined
    state.profile = undefined
    state.loggedIn = false
    state.loginError = undefined
    state.email = undefined

    window.localStorage.removeItem('authData')
    window.localStorage.removeItem('profile')
    window.localStorage.removeItem('email')
  },
}

export class UserState {
  loggedIn: boolean = false
  userLoginData?: UserLoginData
  email?: string
  role?: string
  profile?: Profile
  loginError?: any
}

export const userStore: Module<UserState, RootState> = {
  state: new UserState(),
  mutations,
  actions,
  getters,
}
