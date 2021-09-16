import { defHttp } from '/@/utils/http/axios'
const Api = {
  forgotPassword: '/shipper/account/forgot-password',
}

export const forgotPassword = () => defHttp.post({ url: Api.forgotPassword })
