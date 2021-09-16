<style lang="scss">
  .exception {
    display: flex;
    align-items: center;
    flex-direction: column;

    .ant-result-icon {
      img {
        max-width: 400px;
        max-height: 300px;
      }
    }
  }
</style>
<script lang="tsx">
  import type { PropType } from 'vue'
  import { defineComponent, ref, computed, unref } from 'vue'
  import { ExceptionEnum } from '/@/enums/exceptionEnum'
  import notDataSvg from '/@/assets/svg/no-data.svg'
  import netWorkSvg from '/@/assets/svg/net-error.svg'
  import { useRoute } from 'vue-router'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useGo, useRedo } from '/@/hooks/web/usePage'

  import { PageEnum } from '/@/enums/pageEnum'

  interface MapValue {
    title: string
    subTitle: string
    btnText?: string
    icon?: string
    handler?: Fn
    status?: string
  }

  export default defineComponent({
    name: 'ErrorPage',
    props: {
      status: {
        type: Number as PropType<number>,
        default: ExceptionEnum.PAGE_NOT_FOUND,
      },

      title: {
        type: String as PropType<string>,
        default: '',
      },

      subTitle: {
        type: String as PropType<string>,
        default: '',
      },

      full: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
    },
    setup(props) {
      const statusMapRef = ref(new Map<string | number, MapValue>())

      const { query } = useRoute()
      const go = useGo()
      const redo = useRedo()
      const { prefixCls } = useDesign('app-exception-page')

      const getStatus = computed(() => {
        const { status: routeStatus } = query
        const { status } = props
        return Number(routeStatus) || status
      })

      const getMapValue = computed((): MapValue => {
        return unref(statusMapRef).get(unref(getStatus)) as MapValue
      })

      const backLoginI18n = 'sys.exception.backLogin'
      const backHomeI18n = 'sys.exception.backHome'

      unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
        title: '403',
        status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
        subTitle: 'sys.exception.subTitle403',
        btnText: props.full ? backLoginI18n : backHomeI18n,
        handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
      })

      unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
        title: '404',
        status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
        subTitle: 'sys.exception.subTitle404',
        btnText: props.full ? backLoginI18n : backHomeI18n,
        handler: () => (props.full ? go(PageEnum.BASE_LOGIN) : go()),
      })

      unref(statusMapRef).set(ExceptionEnum.ERROR, {
        title: '500',
        status: `${ExceptionEnum.ERROR}`,
        subTitle: 'sys.exception.subTitle500',
        btnText: backHomeI18n,
        handler: () => go(),
      })

      unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
        title: 'sys.exception.noDataTitle',
        subTitle: '',
        btnText: 'common.redo',
        handler: () => redo(),
        icon: notDataSvg,
      })

      unref(statusMapRef).set(ExceptionEnum.NET_WORK_ERROR, {
        title: 'sys.exception.networkErrorTitle',
        subTitle: 'sys.exception.networkErrorSubTitle',
        btnText: 'common.redo',
        handler: () => redo(),
        icon: netWorkSvg,
      })

      return () => {
        const { title, subTitle, btnText, icon, handler } = unref(getMapValue) || {}
        return (
          <div
            class={prefixCls}
            title={props.title || title}
            sub-title={props.subTitle || subTitle}
          >
            {{
              extra: () =>
                btnText && (
                  <button type="button" onClick={handler}>
                    {() => btnText}
                  </button>
                ),
              icon: () => (icon ? <img src={icon} /> : null),
            }}
          </div>
        )
      }
    },
  })
</script>
