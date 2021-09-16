<template>
  <button v-bind="$attrs" :disabled="isStart" @click="handleStart" :loading="loading">
    {{ getButtonText }}
  </button>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect, computed, unref } from 'vue'
  import { useCountdown } from './useCountdown'
  import { isFunction } from '/@/utils/is'

  const props = {
    value: { type: [Object, Number, String, Array] },
    text: { type: String },
    count: { type: Number, default: 60 },
    beforeStartFunc: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  }

  export default defineComponent({
    name: 'CountButton',
    props,
    setup(props) {
      const loading = ref(false)

      const { currentCount, isStart, start, reset } = useCountdown(props.count)
      const getButtonText = computed(() => {
        return !unref(isStart)
          ? props.text || 'component.countdown.normalText'
          : 'component.countdown.sendText'
      })

      watchEffect(() => {
        props.value === undefined && reset()
      })

      async function handleStart() {
        const { beforeStartFunc } = props
        if (beforeStartFunc && isFunction(beforeStartFunc)) {
          loading.value = true
          try {
            const canStart = await beforeStartFunc()
            canStart && start()
          } finally {
            loading.value = false
          }
        } else {
          start()
        }
      }
      return { handleStart, currentCount, loading, getButtonText, isStart }
    },
  })
</script>
