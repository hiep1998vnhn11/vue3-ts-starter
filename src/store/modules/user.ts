import type { UserInfo } from '/#/store'
import type { ErrorMessageMode } from '/#/axios'
import { RoleEnum } from '/@/enums/roleEnum'
import { PageEnum } from '/@/enums/pageEnum'
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { GetUserInfoModel, LoginParams, VerifySmsParams } from '/@/api/sys/model/userModel'
import { doLogout, getUserInfo, loginApi, verifySms } from '/@/api/sys/user'
import router from '../../router'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
}

const state = (): UserState => ({
  userInfo: null,
  token: undefined,
  roleList: [],
  sessionTimeout: false,
})
const getters = {
  getUserInfo: (state: UserState): UserInfo =>
    state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {},
  getToken: (state: UserState): string => state.token || getAuthCache<string>(TOKEN_KEY),
  getRoleList: (state: UserState): RoleEnum[] =>
    state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY),
  getSessionTimeout: (state: UserState): boolean => !!state.sessionTimeout,
}

async function getUserInfoAction(commit) {
  const userInfo = await getUserInfo()
  const { roles } = userInfo
  const roleList = roles.map((item) => item.name) as RoleEnum[]
  commit('SET_STATE', ['userInfo', userInfo])
  setAuthCache(USER_INFO_KEY, userInfo)
  commit('SET_STATE', ['roleList', roleList])
  setAuthCache(ROLES_KEY, roleList)
  return userInfo
}

async function logout(commit, goLogin = false) {
  try {
    await doLogout()
  } catch {
    console.log('Logout faild!')
  } finally {
    commit('SET_STATE', ['token', undefined])
    setAuthCache(TOKEN_KEY, undefined)
    commit('SET_STATE', ['sessionTimeout', false])
    goLogin && router.push(PageEnum.BASE_LOGIN)
  }
}

const actions = {
  setToken({ commit }, info: string | undefined) {
    commit('SET_STATE', ['token', info])
    setAuthCache(TOKEN_KEY, info)
  },
  setRoleList({ commit }, roleList: RoleEnum[]) {
    commit('SET_STATE', ['roleList', roleList])
    setAuthCache(ROLES_KEY, roleList)
  },
  setUserInfo({ commit }, info: UserInfo) {
    commit('SET_STATE', ['userInfo', info])
    setAuthCache(USER_INFO_KEY, info)
  },
  setSessionTimeout({ commit }, flag: boolean) {
    commit('SET_STATE', ['sessionTimeout', flag])
  },
  async login(
    { commit, state },
    params: LoginParams & {
      goHome?: boolean
      mode?: ErrorMessageMode
    }
  ): Promise<GetUserInfoModel | null> {
    try {
      const { goHome = true, mode, ...loginParams } = params
      const data = await loginApi(loginParams, mode)
      const { access_token } = data
      commit('SET_STATE', ['token', access_token])
      setAuthCache(TOKEN_KEY, access_token)
      const userInfo = await getUserInfoAction(commit)
      const sessionTimeout = state.sessionTimeout
      sessionTimeout && commit('SET_STATE', ['sessionTimeout', false])
      !sessionTimeout && goHome && (await router.push(PageEnum.BASE_HOME))
      return userInfo
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async verifySms({ commit }, params: VerifySmsParams): Promise<GetUserInfoModel | null> {
    try {
      const data = await verifySms(params)
      const { access_token } = data
      commit('SET_STATE', ['token', access_token])
      setAuthCache(TOKEN_KEY, access_token)
      const userInfo = await getUserInfoAction(commit)
      await router.push('/account/set-password')
      return userInfo
    } catch (error) {
      return Promise.reject(error)
    }
  },
  confirmLoginOut({ commit }) {
    console.log({
      iconType: 'warning',
      title: 'sys.app.logoutTip',
      content: 'sys.app.logoutMessage',
      onOk: async () => {
        await logout(commit, true)
      },
    })
  },

  async sessionLogout({ commit }) {
    commit('SET_STATE', ['token', undefined])
    setAuthCache(TOKEN_KEY, undefined)
    commit('SET_STATE', ['sessionTimeout', false])
    router.push(PageEnum.BASE_LOGIN)
  },

  async refreshUserInfo({ commit }) {
    try {
      await getUserInfoAction(commit)
    } catch (error) {
      return Promise.reject(error)
    }
  },
}

const mutations = {
  SET_STATE: function (state: UserState, payload: [string, any]) {
    const [key, value] = payload
    state[key] = value
  },
  RESET_STATE: function (state: UserState) {
    state.userInfo = null
    state.token = ''
    state.roleList = []
    state.sessionTimeout = false
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
