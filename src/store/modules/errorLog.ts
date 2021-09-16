import type { ErrorLogInfo } from '/#/store'

import { formatToDateTime } from '/@/utils/dateUtil'
import projectSetting from '/@/settings/projectSetting'

import { ErrorTypeEnum } from '/@/enums/exceptionEnum'

export interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>
  errorLogListCount: number
}

const state = (): ErrorLogState => ({
  errorLogInfoList: null,
  errorLogListCount: 0,
})
const getters = {
  getErrorLogInfoList: (state: ErrorLogState): ErrorLogInfo[] => state.errorLogInfoList || [],
  getErrorLogListCount: (state: ErrorLogState): number => state.errorLogListCount,
}
const actions = {
  /**
   * Triggered after ajax request error
   * @param error
   * @returns
   */
  addAjaxErrorInfo({ commit }, error) {
    const { useErrorHandle } = projectSetting
    if (!useErrorHandle) {
      return
    }
    const errInfo: Partial<ErrorLogInfo> = {
      message: error.message,
      type: ErrorTypeEnum.AJAX,
    }
    if (error.response) {
      const {
        config: { url = '', data: params = '', method = 'get', headers = {} } = {},
        data = {},
      } = error.response
      errInfo.url = url
      errInfo.name = 'Ajax Error!'
      errInfo.file = '-'
      errInfo.stack = JSON.stringify(data)
      errInfo.detail = JSON.stringify({ params, method, headers })
    }
    commit('addErrorLogInfo', errInfo as ErrorLogInfo)
  },
}

const mutations = {
  SET_STATE: function (state: ErrorLogState, payload: [string, any]) {
    const [key, value] = payload
    state[key] = value
  },
  ADD_ERROR_LOG_INFO(state: ErrorLogState, info: ErrorLogInfo) {
    const item = {
      ...info,
      time: formatToDateTime(new Date()),
    }
    state.errorLogInfoList = [item, ...(state.errorLogInfoList || [])]
    state.errorLogListCount += 1
  },

  SET_ERROR_LOG_LIST_COUNT(state: ErrorLogState, count: number): void {
    state.errorLogListCount = count
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
