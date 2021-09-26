<template>
  {{ $route.params.url }}
  <button class="btn">123</button>
</template>
<script lang="ts">
  import { onMounted } from 'vue'
  export default {
    setup() {
      onMounted(() => {})
      return {}
    },
  }
</script>
<style lang="scss" scoped></style>
