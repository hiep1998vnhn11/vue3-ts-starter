import { colorIsDark, lighten, darken } from '/@/utils/color'
import { store } from '/@/store'
import { ThemeEnum } from '/@/enums/appEnum'
import { setCssVar } from './util'

const HEADER_BG_COLOR_VAR = '--header-bg-color'
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color'
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color'

const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color'
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color'
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color'

/**
 * Change the background color of the top header
 * @param color
 */
export function updateHeaderBgColor(color?: string) {
  const darkMode = store.getters['app/getDarkMode'] === ThemeEnum.DARK
  if (!color) {
    if (darkMode) {
      color = '#151515'
    } else {
      color = store.getters['app/getHeaderSetting'].bgColor
    }
  }
  // bg color
  setCssVar(HEADER_BG_COLOR_VAR, color)

  // hover color
  const hoverColor = lighten(color!, 6)
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor)
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor)

  // Determine the depth of the color value and automatically switch the theme
  const isDark = colorIsDark(color!)

  store.commit('app/SET_PROJECT_CONFIG', {
    headerSetting: {
      theme: isDark || darkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    },
  })
}

/**
 * Change the background color of the left menu
 * @param color  bg color
 */
export function updateSidebarBgColor(color?: string) {
  const darkMode = store.getters['app/getDarkMode'] === ThemeEnum.DARK
  if (!color) {
    if (darkMode) {
      color = '#212121'
    } else {
      color = store.getters['app/getMenuSetting'].bgColor
    }
  }
  setCssVar(SIDER_DARK_BG_COLOR, color)
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color!, 6))
  setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color!, 5))
  const isLight = ['#fff', '#ffffff'].includes(color!.toLowerCase())
  store.commit('app/SET_PROJECT_CONFIG', {
    menuSetting: {
      theme: isLight && !darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK,
    },
  })
}
