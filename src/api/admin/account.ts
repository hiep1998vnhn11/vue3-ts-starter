import { defHttp } from '/@/utils/http/axios'
import {
  ListAccount,
  AccountCreateParams,
  GetListAccountParams,
  ChangePasswordParams,
} from './model/accountModel'
import { BasicResponseMessage } from '../model/baseModel'
const indexApi = '/admin/accounts'

export const getListAccount = (params: GetListAccountParams) =>
  defHttp.get<ListAccount>({ url: indexApi, params })

export const createAccount = (params: AccountCreateParams) =>
  defHttp.post<BasicResponseMessage>({ url: indexApi, params })

export const getAccountInfo = (id: string | string[]) => defHttp.get({ url: indexApi + '/' + id })

export const updateAccountInfo = (params: AccountCreateParams, id: string | string[]) =>
  defHttp.put<BasicResponseMessage>({ url: indexApi + '/' + id, params })
export const changeAccountPassword = (params: ChangePasswordParams) =>
  defHttp.post({ url: indexApi + '/reset-password', params })
export const resendSms = (params: { phone: string }) =>
  defHttp.post({ url: indexApi + '/resend-sms', params })
