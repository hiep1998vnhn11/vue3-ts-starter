import { withInstall } from '/@/utils'
import fadeTransition from './src/Fade/FadeTransition.vue'
import zoomCenterTransition from './src/Zoom/ZoomCenterTransition.vue'
import zoomXTransition from './src/Zoom/ZoomXTransition.vue'
import zoomYTransition from './src/Zoom/ZoomYTransition.vue'
import collapseTransition from './src/Collapse/CollapseTransition.vue'
import scaleTransition from './src/Scale/ScaleTransition.vue'
import slideYUpTransition from './src/Slide/SlideYUpTransition.vue'
import slideYDownTransition from './src/Slide/SlideYDownTransition.vue'
import slideXLeftTransition from './src/Slide/SlideXLeftTransition.vue'
import slideXRightTransition from './src/Slide/SlideXRightTransition.vue'

export const FadeTransition = withInstall(fadeTransition)
export const ZoomCenterTransition = withInstall(zoomCenterTransition)
export const ZoomXTransition = withInstall(zoomXTransition)
export const ZoomYTransition = withInstall(zoomYTransition)
export const CollapseTransition = withInstall(collapseTransition)
export const ScaleTransition = withInstall(scaleTransition)
export const SlideYUpTransition = withInstall(slideYUpTransition)
export const SlideYDownTransition = withInstall(slideYDownTransition)
export const SlideXLeftTransition = withInstall(slideXLeftTransition)
export const SlideXRightTransition = withInstall(slideXRightTransition)
