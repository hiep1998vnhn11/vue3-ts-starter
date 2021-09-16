import { defHttp } from '/@/utils/http/axios'
import {
  ListCheckWarehouse,
  CheckWarehouseCreateParams,
  GetListCheckWarehouseParams,
  CheckWarehouseShow,
  AcceptCheckProductParams,
  Product,
} from './model/checkWarehouseModel'
const indexApi = '/admin/check-products'

export const getCheckWarehouseList = (params: GetListCheckWarehouseParams) =>
  defHttp.get<ListCheckWarehouse>({ url: indexApi, params })

export const createCheckWarehouse = (params: CheckWarehouseCreateParams) =>
  defHttp.post({ url: indexApi, params })

export const getCheckWarehouseDetail = (id: string) =>
  defHttp.get<CheckWarehouseShow>({ url: indexApi + '/' + id })

export const acceptCheckWarehouse = (params: AcceptCheckProductParams) =>
  defHttp.put<string>({ url: indexApi + '/accept', params })

export const getProducts = (params: { warehouse_id?: string }) =>
  defHttp.get<[number: number]>({ url: indexApi + '/products', params })

export const updateCheckWarehouse = (id: string | string[], params: CheckWarehouseCreateParams) =>
  defHttp.put({ url: indexApi + '/' + id, params })
