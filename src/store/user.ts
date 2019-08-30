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

    let meData = await axios.get(
      new URL("user/me", config.backend.address).href,
      {
        headers: {
          Authorization: `Bearer ${loginData.data.access_token}`
        }
      }
    );

    ctx.state.role = meData.data.role

    ctx.dispatch("updateProfile");

    if (payload.callback) {
      payload.callback(isLoginSuccessful)
    }
  },
  async updateProfile(ctx) {
    if (!ctx.state.email || !ctx.state.userLoginData) throw new Error('Not logged in')
    try {
      let profile = await getProfileId(ctx.state.email, ctx.getters.authHeader)
      ctx.commit('updateUserData', profile)
    } catch (e) {
      ctx.commit("logout")
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
  tryRestoreData(state) {
    let header = window.localStorage.getItem('auth')
    let scope = window.localStorage.getItem('auth_scope') || 'identityServerApi'
    let email = window.localStorage.getItem('email') || 'identityServerApi'
    if (header && scope && email) {
      state.userLoginData = {
        access_token: header,
        expires_in: 0,
        token_type: 'Bearer',
        scope
      }
      state.email = email
      state.loggedIn = true
    }
  },
  tryStoreData(state) {
    if (state.userLoginData && state.email) {
      window.localStorage.setItem('auth', state.userLoginData.access_token)
      window.localStorage.setItem('auth_scope', state.userLoginData.scope)
      window.localStorage.setItem('email', state.email)
    }
  },
  logout(state) {
    state.userLoginData = undefined;
    state.profile = undefined;
    state.loggedIn = false;
    state.loginError = undefined;
    state.email = undefined
  }
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
  getters
}
