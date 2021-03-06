<template>
  <div v-if="getShowDarkModeToggle" :class="getClass" @click="toggleDarkMode">
    <div :class="`${prefixCls}-inner`"> </div>
    <SvgIcon size="14" name="sun" />
    <SvgIcon size="14" name="moon" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground'
  import { updateDarkTheme } from '/@/logics/theme/dark'
  import { ThemeEnum } from '/@/enums/appEnum'

  export default defineComponent({
    name: 'DarkModeToggle',
    setup() {
      const { prefixCls } = useDesign('dark-switch')
      const { getDarkMode, setDarkMode, getShowDarkModeToggle } = useRootSetting()

      const isDark = computed(() => getDarkMode.value === ThemeEnum.DARK)

      const getClass = computed(() => [
        prefixCls,
        {
          [`${prefixCls}--dark`]: unref(isDark),
        },
      ])

      function toggleDarkMode() {
        const darkMode = getDarkMode.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK
        setDarkMode(darkMode)
        updateDarkTheme(darkMode)
        updateHeaderBgColor()
        updateSidebarBgColor()
      }

      return {
        getClass,
        isDark,
        prefixCls,
        toggleDarkMode,
        getShowDarkModeToggle,
      }
    },
  })
</script>
<style lang="scss" scoped>
  html[data-theme='dark'] {
    .switch-toggle {
      border: 1px solid rgb(196, 188, 188);
    }
  }

  .switch-toggle {
    position: relative;
    display: flex;
    width: 50px;
    height: 26px;
    padding: 0 6px;
    margin-left: auto;
    cursor: pointer;
    background-color: #151515;
    border-radius: 30px;
    justify-content: space-between;
    align-items: center;

    &-inner {
      position: absolute;
      z-index: 1;
      width: 18px;
      height: 18px;
      background-color: #fff;
      border-radius: 50%;
      transition: transform 0.5s, background-color 0.5s;
      will-change: transform;
    }

    &--dark {
      .switch-toggle-inner {
        transform: translateX(calc(100% + 2px));
      }
    }
  }
</style>
