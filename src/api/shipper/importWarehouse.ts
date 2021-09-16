import { defHttp } from '/@/utils/http/axios'
import {
  ListImportWarehouse,
  ImportWarehouseCreateParams,
  GetListImportWarehouseParams,
  ImportWarehouseShow,
} from './model/importWarehouseModel'
import { BasicResponseMessage } from '../model/baseModel'
const indexApi = '/shipper/import-products'

export const getImportWarehouseList = (params: GetListImportWarehouseParams) =>
  defHttp.get<ListImportWarehouse>({ url: indexApi, params })

export const createImportWarehouse = (params: ImportWarehouseCreateParams) =>
  defHttp.post<BasicResponseMessage>({ url: indexApi, params })

export const getImportWarehouseDetail = (id: string) =>
  defHttp.get<ImportWarehouseShow>({ url: indexApi + '/' + id })
