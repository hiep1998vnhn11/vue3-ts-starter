import type {
  ProjectConfig,
  HeaderSetting,
  MenuSetting,
  TransitionSetting,
  MultiTabsSetting,
} from '/#/config'
import type { BeforeMiniState } from '/#/store'
import { ThemeEnum } from '/@/enums/appEnum'
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '/@/enums/cacheEnum'
import { Persistent } from '/@/utils/cache/persistent'
import { darkMode } from '/@/settings/designSetting'
import { deepMerge } from '/@/utils'

interface AppState {
  darkMode?: ThemeEnum
  pageLoading: boolean
  projectConfig: ProjectConfig
  beforeMiniInfo: BeforeMiniState
}
let timeId: TimeoutHandle
const state = (): AppState => ({
  darkMode: undefined,
  pageLoading: false,
  projectConfig: Persistent.getLocal(PROJ_CFG_KEY) || ({} as ProjectConfig),
  beforeMiniInfo: {},
})
const getters = {
  getPageLoading: (state: AppState): boolean => state.pageLoading,
  getDarkMode: (state: AppState): 'light' | 'dark' | string =>
    state.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode,
  getBeforeMiniInfo: (state: AppState): BeforeMiniState => state.beforeMiniInfo,
  getProjectConfig: (state: AppState): ProjectConfig =>
    state.projectConfig || ({} as ProjectConfig),
  getHeaderSetting: (state: AppState): HeaderSetting => state.projectConfig.headerSetting,
  getMenuSetting: (state: AppState): MenuSetting => state.projectConfig.menuSetting,
  getTransitionSetting: (state: AppState): TransitionSetting =>
    state.projectConfig.transitionSetting,
  getMultiTabsSetting: (state: AppState): MultiTabsSetting => state.projectConfig.multiTabsSetting,
}
const actions = {
  async setPageLoadingAction({ commit }, loading: boolean): Promise<void> {
    if (loading) {
      clearTimeout(timeId)
      timeId = setTimeout(() => {
        commit('SET_STATE', ['pageLoading', loading])
      }, 50)
    } else {
      commit('SET_STATE', ['pageLoading', loading])
      clearTimeout(timeId)
    }
  },
}

const mutations = {
  SET_STATE: function (state: AppState, payload: [string, any]) {
    const [key, value] = payload
    state[key] = value
  },
  SET_DARK_MODE: function (state: AppState, mode: ThemeEnum) {
    state.darkMode = mode
    localStorage.setItem(APP_DARK_MODE_KEY_, mode)
  },
  SET_BEFORE_MINI_INFO: function (state: AppState, beforeState: BeforeMiniState) {
    state.beforeMiniInfo = beforeState
  },
  SET_PROJECT_CONFIG: function (state: AppState, config: DeepPartial<ProjectConfig>) {
    state.projectConfig = deepMerge(state.projectConfig || {}, config)
    Persistent.setLocal(PROJ_CFG_KEY, state.projectConfig)
  },
  SET_PAGE_LOADING: function (state: AppState, loading: boolean) {
    state.pageLoading = loading
  },
  RESET_STATE: function () {
    Persistent.clearAll()
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
