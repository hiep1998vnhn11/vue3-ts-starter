import { defHttp } from '/@/utils/http/axios'
import { ListOrder, AccountCreateParams, GetListOrderParams, OrderDetail } from './model/orderModel'
import { BasicResponseMessage } from '../model/baseModel'

const indexApi = '/admin/orders'

export const getListOrder = (params: GetListOrderParams) =>
  defHttp.get<ListOrder>({ url: indexApi, params })

export const createAccount = (params: AccountCreateParams) =>
  defHttp.post<BasicResponseMessage>({ url: indexApi, params })

export const getAccountInfo = (id: string | string[]) =>
  defHttp.get<BasicResponseMessage>({ url: indexApi + '/' + id })

export const updateAccountInfo = (params: AccountCreateParams, id: string | string[]) =>
  defHttp.put<BasicResponseMessage>({ url: indexApi + '/' + id, params })

export const getOrderDetail = (id: string) => defHttp.get<OrderDetail>({ url: indexApi + '/' + id })

import { SyncOrderParams, SyncResponse } from './model/orderModel'

export const syncOrderAhamoveApi = (params: SyncOrderParams) =>
  defHttp.post<SyncResponse>({ url: indexApi + '/sync-ahamove', params })

export const syncOrderSapoApi = (params: SyncOrderParams) =>
  defHttp.post<SyncResponse>({ url: indexApi + '/sync-sapo', params })

export const getToken = () => defHttp.post({ url: indexApi + '/get-ahamove-token' })

export const updateOrder = (id: string | string[]) => defHttp.put({ url: indexApi + '/' + id })
