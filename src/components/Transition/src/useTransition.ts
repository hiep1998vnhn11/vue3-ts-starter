import type { VueElement } from 'vue'
import { isObject } from '/@/utils/is'
import { computed } from 'vue'
type Duration =
  | {
      enter: number
      leave: number
    }
  | number

type Style = {
  [key: string]: string
}

type Props = {
  duration: Duration
  delay: Duration
  group: boolean
  styles: Style
  origin: string
}

export default function useTransition({
  duration = 300,
  delay = 0,
  group = false,
  styles = {
    animationFillMode: 'both',
    animationTimingFunction: 'ease-out',
  },
  origin = '',
}: Props) {
  const componentType = computed(() => (group ? 'transition-group' : 'transition'))
  function beforeEnter(el: VueElement) {
    const enterDuration = isObject(duration) ? duration.enter : duration
    el.style.animationDuration = `${enterDuration}ms`
    const enterDelay = isObject(delay) ? delay.enter : delay
    el.style.animationDelay = `${enterDelay}ms`
    setStyles(el)
  }
  function cleanUpStyles(el: VueElement) {
    Object.keys(styles).forEach((key) => {
      const styleValue = styles[key]
      if (styleValue) {
        el.style[key] = ''
      }
    })
    el.style.animationDuration = ''
    el.style.animationDelay = ''
  }
  function beforeLeave(el: VueElement) {
    const leaveDuration = isObject(duration) ? duration.leave : duration
    el.style.animationDuration = `${leaveDuration}ms`
    const leaveDelay = isObject(delay) ? delay.leave : delay
    el.style.animationDelay = `${leaveDelay}ms`
    setStyles(el)
  }
  function leave(el: VueElement) {
    setAbsolutePosition(el)
  }
  function setStyles(el: VueElement) {
    setTransformOrigin(el)
    Object.keys(styles).forEach((key) => {
      const styleValue = styles[key]
      if (styleValue) {
        el.style[key] = styleValue
      }
    })
  }
  function setAbsolutePosition(el: VueElement) {
    if (group) {
      el.style.position = 'absolute'
    }
  }
  function setTransformOrigin(el: VueElement) {
    if (origin) {
      el.style.transformOrigin = origin
    }
  }
  return {
    hooks: {
      setTransformOrigin,
      setAbsolutePosition,
      setStyles,
      leave,
      beforeLeave,
      cleanUpStyles,
      beforeEnter,
    },
    componentType,
  }
}
