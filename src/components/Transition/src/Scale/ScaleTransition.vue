<template>
  <component
    :is="componentType"
    :tag="tag"
    v-bind="$attrs"
    v-on="hooks"
    enter-active-class="scaleIn"
    move-class="scale-move"
    leave-active-class="scaleOut"
  >
    <slot></slot>
  </component>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import useTransition from '../useTransition'
  export default defineComponent({
    name: 'scale-transition',
    props: {
      origin: {
        type: String,
        default: 'top left',
      },
      styles: {
        type: Object,
        default: () => {
          return {
            animationFillMode: 'both',
            animationTimingFunction: 'cubic-bezier(.25,.8,.50,1)',
          }
        },
      },
    },
    setup(props) {
      const { componentType } = useTransition(props as any)
      return {
        componentType,
      }
    },
  })
</script>
<style lang="scss" scoped>
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0);
    }

    to {
      opacity: 1;
    }
  }

  .scaleIn {
    animation-name: scaleIn;
  }

  @keyframes scaleOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: scale(0);
    }
  }

  .scaleOut {
    animation-name: scaleOut;
  }

  .scale-move {
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
</style>
