import type { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router'
import { toRaw, unref } from 'vue'
import { useGo, useRedo } from '/@/hooks/web/usePage'
import { Persistent } from '/@/utils/cache/persistent'
import { PageEnum } from '/@/enums/pageEnum'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import { getRawRoute } from '/@/utils'
import { MULTIPLE_TABS_KEY } from '/@/enums/cacheEnum'

import projectSetting from '/@/settings/projectSetting'

export interface MultipleTabState {
  cacheTabList: Set<string>
  tabList: RouteLocationNormalized[]
  lastDragEndIndex: number
}

export interface TabAction {
  tab: RouteLocationNormalized
  router: Router
}

function handleGotoPage(router: Router) {
  const go = useGo(router)
  go(unref(router.currentRoute).path, true)
}

function goToPage(state, router: Router) {
  const go = useGo(router)
  const len = state.tabList.length
  const { path } = unref(router.currentRoute)
  let toPath: PageEnum | string = PageEnum.BASE_HOME
  if (len > 0) {
    const page = state.tabList[len - 1]
    const p = page.fullPath || page.path
    if (p) {
      toPath = p
    }
  }
  path !== toPath && go(toPath as PageEnum, true)
}

async function closeTab(state, tab: RouteLocationNormalized, router: Router) {
  const getToTarget = (tabItem: RouteLocationNormalized) => {
    const { params, path, query } = tabItem
    return {
      params: params || {},
      path,
      query: query || {},
    }
  }

  const close = (route: RouteLocationNormalized) => {
    const { fullPath, meta: { affix } = {} } = route
    if (affix) {
      return
    }
    const index = state.tabList.findIndex((item) => item.fullPath === fullPath)
    index !== -1 && state.tabList.splice(index, 1)
  }

  const { currentRoute, replace } = router

  const { path } = unref(currentRoute)
  if (path !== tab.path) {
    // Closed is not the activation tab
    close(tab)
    return
  }

  // Closed is activated atb
  let toTarget: RouteLocationRaw = {}

  const index = state.tabList.findIndex((item) => item.path === path)

  // If the current is the leftmost tab
  if (index === 0) {
    // There is only one tab, then jump to the homepage, otherwise jump to the right tab
    if (state.tabList.length === 1) {
      toTarget = PageEnum.BASE_HOME
    } else {
      //  Jump to the right tab
      const page = state.tabList[index + 1]
      toTarget = getToTarget(page)
    }
  } else {
    // Close the current tab
    const page = state.tabList[index - 1]
    toTarget = getToTarget(page)
  }
  close(currentRoute.value)
  replace(toTarget)
}

const cacheTab = projectSetting.multiTabsSetting.cache

const state = (): MultipleTabState => ({
  // Tabs that need to be cached
  cacheTabList: new Set(),
  // multiple tab list
  tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
  // Index of the last moved tab
  lastDragEndIndex: 0,
})

const getters = {
  getTabList: (state: MultipleTabState): RouteLocationNormalized[] => state.tabList,
  getCachedTabList: (state: MultipleTabState): string[] => Array.from(state.cacheTabList),
  getLastDragEndIndex: (state: MultipleTabState): number => state.lastDragEndIndex,
}

const actions = {
  /**
   * Refresh tabs
   */
  async refreshPage({ commit, state }, router: Router) {
    const { currentRoute } = router
    const route = unref(currentRoute)
    const name = route.name

    const findTab = state.getCachedTabList.find((item) => item === name)
    if (findTab) {
      commit('DELETE_TAB', findTab)
    }
    const redo = useRedo(router)
    await redo()
  },

  async addTab({ state, commit }, route: RouteLocationNormalized) {
    const { path, name, fullPath, params, query } = getRawRoute(route)
    // 404  The page does not need to add a tab
    if (path === PageEnum.ERROR_PAGE || !name || name == PAGE_NOT_FOUND_ROUTE.name) {
      return
    }

    let updateIndex = -1
    // Existing pages, do not add tabs repeatedly
    const tabHasExits = state.tabList.some((tab, index) => {
      updateIndex = index
      return (tab.fullPath || tab.path) === (fullPath || path)
    })

    // If the tab already exists, perform the update operation
    if (tabHasExits) {
      const curTab = toRaw(state.tabList)[updateIndex]
      if (!curTab) {
        return
      }
      curTab.params = params || curTab.params
      curTab.query = query || curTab.query
      curTab.fullPath = fullPath || curTab.fullPath
      state.tabList.splice(updateIndex, 1, curTab)
    } else {
      state.tabList.push(route)
    }
    commit('UPDATE_CACHE_TAB')
    cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, state.tabList)
  },
  // Close according to key
  async closeTabByKey({ state }, { key, router }: { key: string; router: Router }) {
    const index = state.tabList.findIndex((item) => (item.fullPath || item.path) === key)
    index !== -1 && closeTab(state, state.tabList[index], router)
  },
  async closeTab({ state }, { tab, router }: TabAction) {
    await closeTab(state, tab, router)
  },

  // Sort the tabs
  async sortTabs(
    { state, commit },
    { oldIndex, newIndex }: { oldIndex: number; newIndex: number }
  ) {
    const currentTab = state.tabList[oldIndex]
    state.tabList.splice(oldIndex, 1)
    state.tabList.splice(newIndex, 0, currentTab)
    commit('SET_STATE', ['lastDragEndIndex', state.lastDragEndIndex + 1])
  },

  // Close the tab on the right and jump
  async closeLeftTabs({ commit, state }, { tab, router }: TabAction) {
    const index = state.tabList.findIndex((item) => item.path === tab.path)
    if (index > 0) {
      const leftTabs = state.tabList.slice(0, index)
      const pathList: string[] = []
      for (const item of leftTabs) {
        const affix = item?.meta?.affix ?? false
        if (!affix) {
          pathList.push(item.fullPath)
        }
      }
      commit('BULK_CLOSE_TAB', pathList)
    }
    commit('UPDATE_CACHE_TAB')
    handleGotoPage(router)
  },

  async closeRightTabs({ commit, state }, { tab, router }: TabAction) {
    const index = state.tabList.findIndex((item) => item.fullPath === tab.fullPath)

    if (index >= 0 && index < state.tabList.length - 1) {
      const rightTabs = state.tabList.slice(index + 1, state.tabList.length)

      const pathList: string[] = []
      for (const item of rightTabs) {
        const affix = item?.meta?.affix ?? false
        if (!affix) {
          pathList.push(item.fullPath)
        }
      }
      commit('BULK_CLOSE_TAB', pathList)
    }
    commit('UPDATE_CACHE_TAB')
    handleGotoPage(router)
  },

  /**
   * Close other tabs
   */
  async closeOtherTabs({ commit, state }, { tab, router }: TabAction) {
    const closePathList = state.tabList.map((item) => item.fullPath)

    const pathList: string[] = []

    for (const path of closePathList) {
      if (path !== tab.fullPath) {
        const closeItem = state.tabList.find((item) => item.path === path)
        if (!closeItem) {
          continue
        }
        const affix = closeItem?.meta?.affix ?? false
        if (!affix) {
          pathList.push(closeItem.fullPath)
        }
      }
    }
    commit('BULK_CLOSE_TAB', pathList)
    commit('UPDATE_CACHE_TAB')
    handleGotoPage(router)
  },
}

const mutations = {
  SET_STATE: function (state: MultipleTabState, payload: [string, any]) {
    const [key, value] = payload
    state[key] = value
  },
  DELETE_TAB: function (state: MultipleTabState, findTab) {
    state.cacheTabList.delete(findTab)
  },
  CLEAR_CACHE_TAB(state: MultipleTabState) {
    state.cacheTabList = new Set()
  },
  SET_TAB_TITLE: function (
    state: MultipleTabState,
    { title, route }: { title: string; route: RouteLocationNormalized }
  ) {
    const findTab = state.tabList.find((item) => item === route)
    if (findTab) {
      findTab.meta.title = title
      const cacheMap: Set<string> = new Set()
      for (const tab of state.tabList) {
        const item = getRawRoute(tab)
        // Ignore the cache
        const needCache = !item.meta?.ignoreKeepAlive
        if (!needCache) {
          continue
        }
        const name = item.name as string
        cacheMap.add(name)
      }
      state.cacheTabList = cacheMap
    }
  },
  RESET_STATE(state: MultipleTabState) {
    state.tabList = []
    state.cacheTabList = new Set()
  },
  BULK_CLOSE_TAB: function (state: MultipleTabState, pathList: string[]) {
    state.tabList = state.tabList.filter((item) => !pathList.includes(item.fullPath))
  },
  CLOSE_ALL_TAB: function (state: MultipleTabState, router: Router) {
    state.tabList = state.tabList.filter((item) => item?.meta?.affix ?? false)
    state.cacheTabList = new Set()
    goToPage(state, router)
  },
  UPDATE_CACHE_TAB(state: MultipleTabState) {
    const cacheMap: Set<string> = new Set()
    for (const tab of state.tabList) {
      const item = getRawRoute(tab)
      // Ignore the cache
      const needCache = !item.meta?.ignoreKeepAlive
      if (!needCache) {
        continue
      }
      const name = item.name as string
      cacheMap.add(name)
    }
    state.cacheTabList = cacheMap
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
