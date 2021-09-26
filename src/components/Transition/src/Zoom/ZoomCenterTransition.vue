<template>
  <component
    :is="componentType"
    :tag="tag"
    v-bind="$attrs"
    v-on="hooks"
    enter-active-class="zoomIn"
    move-class="zoom-move"
    leave-active-class="zoomOut"
  >
    <slot></slot>
  </component>
</template>
<script lang="ts">
  import { basicProps } from '../props'
  import { defineComponent } from 'vue'
  import useTransition from '../useTransition'
  export default defineComponent({
    name: 'zoom-center-transition',
    props: basicProps,
    setup(props) {
      const { componentType, hooks } = useTransition(props)
      return { componentType, hooks, tag: props.tag }
    },
  })
</script>
<style lang="scss" scoped>
  @import 'move';
  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
      opacity: 1;
    }
  }

  .zoomIn {
    animation-name: zoomIn;
  }

  @keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
      opacity: 0;
    }
  }

  .zoomOut {
    animation-name: zoomOut;
  }
</style>
