<template>
  <router-view :key="key"></router-view>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import { useRoute } from 'vue-router'
  export default defineComponent({
    setup() {
      const route = useRoute()
      const key = computed(() => route.fullPath)
      return {
        key,
      }
    },
  })
</script>
