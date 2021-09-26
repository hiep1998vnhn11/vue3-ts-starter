import type { PropType } from 'vue'
import { propTypes } from '/@/utils/propTypes'
export type Duration =
  | {
      enter: number
      leave: number
    }
  | number

export type Style = {
  [key: string]: string
}
export const basicProps = {
  duration: {
    type: Number,
    default: 300,
  },
  delay: {
    type: Number,
    default: 0,
  },
  group: propTypes.bool.def(false),
  styles: {
    type: Object as PropType<Style>,
    default: () => ({}),
  },
  origin: propTypes.string.def(''),
  tag: propTypes.string.def('span'),
}
