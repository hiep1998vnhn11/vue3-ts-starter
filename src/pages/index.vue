<template>
  <div>
    Index
    {{ storage }} - {{ previous }}
    <button @click="increate">Remove</button>
  </div>
</template>
<script lang="ts">
  import { ref } from 'vue'
  import usePrevious from '../hooks/usePrevious'
  import { useLocalStorage } from '../hooks/useStorage'
  export default {
    setup() {
      const count = ref(0)
      const previous = usePrevious(count)

      const [storage, setStorage] = useLocalStorage('name', 'hiep')
      const increate = () => setStorage('HiepTran')
      return {
        increate,
        count,
        storage,
        previous,
      }
    },
  }
</script>
<style lang="scss" scoped></style>
