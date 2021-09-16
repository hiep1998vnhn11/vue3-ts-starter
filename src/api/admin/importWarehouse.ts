import { defHttp } from '/@/utils/http/axios'
import {
  ListImportWarehouse,
  ImportWarehouseCreateParams,
  GetListImportWarehouseParams,
  ImportWarehouseShow,
  AcceptImportProductParams,
  DetailProduct,
  ImportPluck,
} from './model/importWarehouseModel'
import { BasicResponseMessage } from '../model/baseModel'
const indexApi = '/admin/import-products'

export const getImportWarehouseList = (params: GetListImportWarehouseParams) =>
  defHttp.get<ListImportWarehouse>({ url: indexApi, params })

export const createImportWarehouse = (params: ImportWarehouseCreateParams) =>
  defHttp.post<BasicResponseMessage>({ url: indexApi, params })

export const getImportWarehouseDetail = (id: string) =>
  defHttp.get<ImportWarehouseShow>({ url: indexApi + '/' + id })

export const acceptImportWarehouse = (params: AcceptImportProductParams) =>
  defHttp.put<string>({ url: indexApi + '/accept', params })
export const cancelImportWarehouse = (params: AcceptImportProductParams) =>
  defHttp.put<string>({ url: indexApi + '/cancel', params })
export const completeImportWarehouse = (params: AcceptImportProductParams) =>
  defHttp.put<string>({ url: indexApi + '/complete', params })

export const getPluck = (params: any) =>
  defHttp.get<ImportPluck[]>({ url: indexApi + '/pluck', params })

export const getDetailProduct = (params: AcceptImportProductParams) =>
  defHttp.get<DetailProduct[]>({ url: indexApi + '/get-detail-products', params })

export const updateImportWarehouse = (id: string | string[], params: ImportWarehouseCreateParams) =>
  defHttp.put({ url: indexApi + '/' + id, params })
