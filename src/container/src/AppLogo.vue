<template>
  <div class="anticon app-logo" @click="goHome">
    <img :src="getSrc" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { useGlobSetting } from '/@/hooks/setting'
  import { useGo } from '/@/hooks/web/usePage'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { PageEnum } from '/@/enums/pageEnum'
  import { useRoute } from 'vue-router'

  const props = {
    theme: { type: String, validator: (v) => ['light', 'dark'].includes(v) },
    showTitle: { type: Boolean, default: true },
    alwaysShowTitle: { type: Boolean },
  }

  export default defineComponent({
    name: 'AppLogo',
    props: props,
    setup() {
      const { getCollapsedShowTitle, getCollapsed } = useMenuSetting()
      const { title } = useGlobSetting()
      const route = useRoute()
      const go = useGo()
      const getSrc = computed(() =>
        !unref(getCollapsed) || route.name == 'Login' ? '/logoHNB.jpg' : '/logoHNB2.jpg'
      )

      function goHome() {
        go(PageEnum.BASE_HOME)
      }

      return {
        getCollapsedShowTitle,
        goHome,
        title,
        getSrc,
      }
    },
  })
</script>
<style lang="scss" scoped>
  .app-logo {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    &.light {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &.light &__title {
      color: #efefef;
    }

    &.dark &__title {
      color: #fff;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
    }
  }
</style>
