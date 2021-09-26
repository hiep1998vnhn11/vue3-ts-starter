<template>
  <AppContainer />
</template>

<script>
  import { defineComponent } from 'vue'
  import { AppContainer } from '/@/container'
  export default defineComponent({
    name: 'App',
    components: {
      AppContainer,
    },
  })
</script>
