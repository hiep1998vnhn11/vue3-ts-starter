<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp :class="`$-help`" v-if="helpMessage" :text="helpMessage" />
  </span>
</template>
<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, computed } from 'vue'
  import BasicHelp from './BasicHelp.vue'
  import { useDesign } from '/@/hooks/web/useDesign'

  const props = {
    /**
     * Help text list or string
     * @default: ''
     */
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    /**
     * Whether the color block on the left side of the title
     * @default: false
     */
    span: { type: Boolean, default: false },
    /**
     * Whether to default the text, that is, not bold
     * @default: false
     */
    normal: { type: Boolean, default: false },
  }

  export default defineComponent({
    name: 'BasicTitle',
    components: { BasicHelp },
    props,
    setup(props, { slots }) {
      const { prefixCls } = useDesign('basic-title')

      const getClass = computed(() => [
        prefixCls,
        { [`${prefixCls}-show-span`]: props.span && slots.default },
        { [`${prefixCls}-normal`]: props.normal },
      ])

      return { prefixCls, getClass }
    },
  })
</script>
<style lang="scss" scoped>
  .basic-title {
    position: relative;
    display: flex;
    padding-left: 7px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    cursor: pointer;
    user-select: none;

    &-normal {
      font-size: 14px;
      font-weight: 500;
    }

    &-show-span::before {
      position: absolute;
      top: 4px;
      left: 0;
      width: 3px;
      height: 16px;
      margin-right: 4px;
      content: '';
    }

    &-help {
      margin-left: 10px;
    }
  }
</style>
