import type { AppRouteRecordRaw, Menu } from '/@/router/types'

import { useI18n } from '/@/hooks/web/useI18n'
import { toRaw } from 'vue'
import { transformObjToRoute, flatMultiLevelRoutes } from '/@/router/helper/routeHelper'
import { transformRouteToMenu } from '/@/router/helper/menuHelper'

import projectSetting from '/@/settings/projectSetting'

import { PermissionModeEnum } from '/@/enums/appEnum'

import { asyncRoutes } from '../../router'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'

import { filter } from '/@/utils/helper/treeHelper'

import { getMenuList } from '/@/api/sys/menu'
import { getPermCode } from '/@/api/sys/user'

import { useMessage } from '/@/hooks/web/useMessage'

interface PermissionState {
  permCodeList: string[] | number[]
  isDynamicAddedRoute: boolean
  lastBuildMenuTime: number
  backMenuList: Menu[]
  frontMenuList: Menu[]
}
const state = (): PermissionState => ({
  permCodeList: [],
  isDynamicAddedRoute: false,
  lastBuildMenuTime: 0,
  backMenuList: [],
  frontMenuList: [],
})
const getters = {
  getPermCodeList: (state: PermissionState): string[] | number[] => state.permCodeList,
  getBackMenuList: (state: PermissionState): Menu[] => state.backMenuList,
  getFrontMenuList: (state: PermissionState): Menu[] => state.frontMenuList,
  getLastBuildMenuTime: (state: PermissionState): number => state.lastBuildMenuTime,
  getIsDynamicAddedRoute: (state: PermissionState): boolean => state.isDynamicAddedRoute,
}
const actions = {
  async buildRoutesAction({ commit, rootGetters }): Promise<AppRouteRecordRaw[]> {
    const { t } = useI18n()
    let routes: AppRouteRecordRaw[] = []
    const roleList = toRaw(rootGetters['user/getRoleList']) || []
    const { permissionMode = projectSetting.permissionMode } = rootGetters['app/getProjectConfig']
    const routeFilter = (route: AppRouteRecordRaw) => {
      const { meta } = route
      const { roles } = meta || {}
      if (!roles) return true
      return roleList.some((role) => roles.includes(role))
    }

    const routeRmoveIgnoreFilter = (route: AppRouteRecordRaw) => {
      const { meta } = route
      const { ignoreRoute } = meta || {}
      return !ignoreRoute
    }
    switch (permissionMode) {
      case PermissionModeEnum.ROLE:
        routes = filter(asyncRoutes, routeFilter)
        routes = routes.filter(routeFilter)
        routes = flatMultiLevelRoutes(routes)
        break

      case PermissionModeEnum.ROUTE_MAPPING:
        routes = filter(asyncRoutes, routeFilter)
        routes = routes.filter(routeFilter)
        const menuList = transformRouteToMenu(routes, true)
        routes = filter(routes, routeRmoveIgnoreFilter)
        routes = routes.filter(routeRmoveIgnoreFilter)
        menuList.sort((a, b) => {
          return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
        })

        commit('SET_STATE', ['frontMenuList', menuList])
        routes = flatMultiLevelRoutes(routes)
        break
      case PermissionModeEnum.BACK:
        const { createMessage } = useMessage()

        createMessage.loading({
          content: t('sys.app.menuLoading'),
          duration: 1,
        })

        let routeList: AppRouteRecordRaw[] = []
        try {
          const codeList = await getPermCode()
          commit('SET_STATE', ['permCodeList', codeList])
          routeList = (await getMenuList()) as AppRouteRecordRaw[]
        } catch (error) {
          console.error(error)
        }
        routeList = transformObjToRoute(routeList)
        const backMenuList = transformRouteToMenu(routeList)
        commit('SET_STATE', ['backMenuList', backMenuList])
        routeList = filter(routeList, routeRmoveIgnoreFilter)
        routeList = routeList.filter(routeRmoveIgnoreFilter)
        routeList = flatMultiLevelRoutes(routeList)
        routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]
        break
    }

    return routes
  },
}

const mutations = {
  SET_STATE: function (state: PermissionState, payload: [string, any]) {
    const [key, value] = payload
    state[key] = value
  },
  SET_BUILD_TIME: function (state: PermissionState) {
    state.lastBuildMenuTime = new Date().getTime()
  },
  SET_DYNAMIC_ADDED_ROUTE(state: PermissionState, added: boolean) {
    state.isDynamicAddedRoute = added
  },
  RESET_STATE(state: PermissionState): void {
    state.isDynamicAddedRoute = false
    state.permCodeList = []
    state.backMenuList = []
    state.lastBuildMenuTime = 0
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
