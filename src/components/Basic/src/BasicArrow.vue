<template>
  <span :class="getClass">
    <div icon="ion:chevron-forward" :style="$attrs.iconStyle" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useDesign } from '/@/hooks/web/useDesign'

  const props = {
    /**
     * Arrow expand state
     */
    expand: { type: Boolean },
    /**
     * Arrow up by default
     */
    up: { type: Boolean },
    /**
     * Arrow down by default
     */
    down: { type: Boolean },
    /**
     * Cancel padding/margin for inline
     */
    inset: { type: Boolean },
  }

  export default defineComponent({
    name: 'BasicArrow',
    props,
    setup(props) {
      const { prefixCls } = useDesign('basic-arrow')

      // get component class
      const getClass = computed(() => {
        const { expand, up, down, inset } = props
        return [
          prefixCls,
          {
            [`${prefixCls}--active`]: expand,
            up,
            inset,
            down,
          },
        ]
      })

      return { getClass }
    },
  })
</script>
<style lang="scss" scoped>
  .basic-arrow {
    display: inline-block;
    cursor: pointer;
    transform: rotate(0deg);
    transition: all 0.3s ease 0.1s;
    transform-origin: center center;

    &--active {
      transform: rotate(90deg);
    }

    &.inset {
      line-height: 0px;
    }

    &.up {
      transform: rotate(-90deg);
    }

    &.down {
      transform: rotate(90deg);
    }

    &.up.basic-arrow--active {
      transform: rotate(90deg);
    }

    &.down.basic-arrow--active {
      transform: rotate(-90deg);
    }
  }
</style>
