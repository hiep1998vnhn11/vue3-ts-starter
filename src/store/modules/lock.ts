import type { LockInfo } from '/#/store'
import { LOCK_INFO_KEY } from '/@/enums/cacheEnum'
import { Persistent } from '/@/utils/cache/persistent'
interface LockState {
  lockInfo: Nullable<LockInfo>
}

const state = (): LockState => ({
  lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
})
const getters = {
  getLockInfo: (state: LockState): Nullable<LockInfo> => state.lockInfo,
}
const actions = {
  async unLock({ commit, state, rootGetters, dispatch }, password?: string) {
    if (state.lockInfo?.pwd === password) {
      commit('resetLockInfo')
      return true
    }
    const tryLogin = async () => {
      try {
        const username = rootGetters['user/getUserInfo']?.username
        const res = await dispatch(
          'user/login',
          {
            username,
            password: password!,
            goHome: false,
            mode: 'none',
          },
          { root: true }
        )
        if (res) {
          commit('resetLockInfo')
        }
        return res
      } catch (error) {
        return false
      }
    }
    return await tryLogin()
  },
}

const mutations = {
  SET_STATE: function (state: LockState, payload: [string, any]) {
    const [key, value] = payload
    state[key] = value
  },
  SET_LOCK_INFO(state: LockState, info: LockInfo) {
    state.lockInfo = Object.assign({}, state.lockInfo, info)
    Persistent.setLocal(LOCK_INFO_KEY, state.lockInfo, true)
  },
  RESET_LOCK_INFO(state: LockState) {
    Persistent.removeLocal(LOCK_INFO_KEY, true)
    state.lockInfo = null
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
