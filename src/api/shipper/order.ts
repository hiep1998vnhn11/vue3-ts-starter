import { defHttp } from '/@/utils/http/axios'
import { ListOrder, GetListOrderParams, OrderDetailResponse } from './model/orderModel'

const indexApi = '/shipper/orders'

export const getListOrder = (params: GetListOrderParams) =>
  defHttp.get<ListOrder>({ url: indexApi, params })

export const getOrderDetail = (id: string) =>
  defHttp.get<OrderDetailResponse>({ url: indexApi + '/' + id })
