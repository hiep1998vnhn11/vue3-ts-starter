import {
  ListShippingPrice,
  GetListShippingPriceParams,
  WarehouseCreateParams,
  WarehouseDeleteparams,
  ImportParams,
  ExportShippingPriceResponse,
  ShippingPriceParams,
} from './model/shippingPriceModel'
import { defHttp } from '/@/utils/http/axios'
const indexApi = '/admin/shipping-price'

export const getListShippingPrice = (params: GetListShippingPriceParams) =>
  defHttp.get<ListShippingPrice>({ url: indexApi, params })

export const createWarehouse = (params: WarehouseCreateParams) =>
  defHttp.post({ url: indexApi, params })

export const deleteWarehouse = (params: WarehouseDeleteparams) =>
  defHttp.delete({ url: indexApi + '/delete', params })

export const exportShippingPrice = (params: GetListShippingPriceParams) =>
  defHttp.get<ExportShippingPriceResponse>({ url: indexApi + '/export', params })

export const importShippingPrice = (params: ImportParams) =>
  defHttp.put({ url: indexApi + '/import', params })

export const getListShipper = () => defHttp.get({ url: indexApi + '/list-shipper' })
export const getAllShipper = () => defHttp.get({ url: indexApi + '/all-shipper' })

export const deleteShippingPrice = (id: string) => defHttp.delete({ url: indexApi + '/' + id })
export const updateShippingPrice = (id: string, params: ShippingPriceParams) =>
  defHttp.put({ url: indexApi + '/' + id, params })
export const createShippingPrice = (params: ShippingPriceParams) =>
  defHttp.post({ url: indexApi, params })
