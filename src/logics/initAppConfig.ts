/**
 * Application configuration
 */
import type { ProjectConfig } from '/#/config'

import { PROJ_CFG_KEY } from '/@/enums/cacheEnum'
import projectSetting from '/@/settings/projectSetting'
import { store } from '/@/store'
import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground'
import { updateColorWeak } from '/@/logics/theme/updateColorWeak'
import { updateGrayMode } from '/@/logics/theme/updateGrayMode'
import { updateDarkTheme } from '/@/logics/theme/dark'
import { changeTheme } from '/@/logics/theme'
import { getCommonStoragePrefix, getStorageShortName } from '/@/utils/env'

import { Persistent } from '/@/utils/cache/persistent'
import { deepMerge } from '/@/utils'
import { ThemeEnum } from '/@/enums/appEnum'

export function initAppConfigStore() {
  const primaryColor = '#0084f4'
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})
  const darkMode = store.getters['app/getDarkMode']
  const {
    colorWeak,
    grayMode,
    themeColor,
    headerSetting: { bgColor: headerBgColor } = {},
    menuSetting: { bgColor } = {},
  } = projCfg
  try {
    if (themeColor && themeColor !== primaryColor) {
      changeTheme(themeColor)
    }
    grayMode && updateGrayMode(grayMode)
    colorWeak && updateColorWeak(colorWeak)
  } catch (error) {
    console.log(error)
  }
  store.commit('app/SET_PROJECT_CONFIG', projCfg)
  updateDarkTheme(darkMode)
  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor()
    updateSidebarBgColor()
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor)
    bgColor && updateSidebarBgColor(bgColor)
  }
  store.dispatch('locale/initLocale')

  setTimeout(() => {
    clearObsoleteStorage()
  }, 16)
}

/**
 * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
 * This method is used to delete useless keys
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix()
  const shortPrefix = getStorageShortName()

  ;[localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key)
      }
    })
  })
}
