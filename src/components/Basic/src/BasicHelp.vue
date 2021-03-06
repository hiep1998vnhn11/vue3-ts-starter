<style lang="scss" scoped>
  .basic-help {
    display: inline-block;
    margin-left: 6px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &__wrap {
      p {
        margin-bottom: 0;
      }
    }
  }
</style>
<script lang="tsx">
  import type { CSSProperties, PropType } from 'vue'
  import { defineComponent, computed, unref } from 'vue'
  import { getPopupContainer } from '/@/utils'
  import { isString, isArray } from '/@/utils/is'
  import { getSlot } from '/@/utils/helper/tsxHelper'
  import { useDesign } from '/@/hooks/web/useDesign'

  const props = {
    /**
     * Help text max-width
     * @default: 600px
     */
    maxWidth: { type: String, default: '600px' },
    /**
     * Whether to display the serial number
     * @default: false
     */
    showIndex: { type: Boolean },
    /**
     * Help text font color
     * @default: #ffffff
     */
    color: { type: String, default: '#ffffff' },
    /**
     * Help text font size
     * @default: 14px
     */
    fontSize: { type: String, default: '14px' },
    /**
     * Help text list
     */
    placement: { type: String, default: 'right' },
    /**
     * Help text list
     */
    text: { type: [Array, String] as PropType<string[] | string> },
  }

  export default defineComponent({
    name: 'BasicHelp',
    props,
    setup(props, { slots }) {
      const { prefixCls } = useDesign('basic-help')

      const getTooltipStyle = computed(
        (): CSSProperties => ({ color: props.color, fontSize: props.fontSize })
      )

      const getOverlayStyle = computed((): CSSProperties => ({ maxWidth: props.maxWidth }))

      function renderTitle() {
        const textList = props.text

        if (isString(textList)) {
          return <p>{textList}</p>
        }

        if (isArray(textList)) {
          return textList.map((text, index) => {
            return (
              <p key={text}>
                <div>
                  {props.showIndex ? `${index + 1}. ` : ''}
                  {text}
                </div>
              </p>
            )
          })
        }
        return null
      }

      return () => {
        return (
          <div
            overlayClassName={`${prefixCls}__wrap`}
            title={<div style={unref(getTooltipStyle)}>{renderTitle()}</div>}
            autoAdjustOverflow={true}
            overlayStyle={unref(getOverlayStyle)}
            placement={props.placement as 'right'}
            getPopupContainer={() => getPopupContainer()}
          >
            <span class={prefixCls}>{getSlot(slots) || <div />}</span>
          </div>
        )
      }
    },
  })
</script>
