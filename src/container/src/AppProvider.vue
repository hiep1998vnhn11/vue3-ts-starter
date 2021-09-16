<script lang="ts">
  import { defineComponent, toRefs, ref, unref } from 'vue'
  import { createAppProviderContext } from './useAppContext'
  import { createBreakpointListen } from '/@/hooks/event/useBreakpoint'
  import { prefixCls } from '/@/settings/designSetting'
  import { useStore } from 'vuex'
  import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum'

  const props = {
    /**
     * class style prefix
     */
    prefixCls: { type: String, default: prefixCls },
  }

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const isMobile = ref(false)
      const isSetState = ref(false)

      const store = useStore()

      // Monitor screen breakpoint information changes
      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const lgWidth = screenMap.get(sizeEnum.LG)
        if (lgWidth) {
          isMobile.value = width.value - 1 < lgWidth
        }
        handleRestoreState()
      })

      const { prefixCls } = toRefs(props)

      // Inject variables into the global
      createAppProviderContext({ prefixCls, isMobile })

      /**
       * Used to maintain the state before the window changes
       */
      function handleRestoreState() {
        if (unref(isMobile)) {
          if (!unref(isSetState)) {
            isSetState.value = true
            const {
              menuSetting: {
                type: menuType,
                mode: menuMode,
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            } = store.getters['app/getProjectConfig']
            store.commit('app/SET_PROJECT_CONFIG', {
              menuSetting: {
                type: MenuTypeEnum.SIDEBAR,
                mode: MenuModeEnum.INLINE,
                split: false,
              },
            })
            store.commit('app/SET_BEFORE_MINI_INFO', {
              menuMode,
              menuCollapsed,
              menuType,
              menuSplit,
            })
          }
        } else {
          if (unref(isSetState)) {
            isSetState.value = false
            const { menuMode, menuCollapsed, menuType, menuSplit } =
              store.getters['app/getBeforeMiniInfo']
            store.commit('app/SET_PROJECT_CONFIG', {
              menuSetting: {
                type: menuType,
                mode: menuMode,
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            })
          }
        }
      }
      return () => slots.default?.()
    },
  })
</script>
