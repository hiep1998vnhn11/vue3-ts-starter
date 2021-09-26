<template>
  <div>
    <AppLogo />
    <router-view :key="key"></router-view>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useRoute } from 'vue-router'
  import AppLogo from './AppLogo.vue'
  export default defineComponent({
    name: 'AppContainer',
    components: {
      AppLogo,
    },
    setup() {
      const route = useRoute()
      const key = computed(() => route.fullPath)
      return {
        key,
      }
    },
  })
</script>
<style lang="scss" scoped></style>
