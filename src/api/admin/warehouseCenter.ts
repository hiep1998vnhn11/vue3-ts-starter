import {
  ListWarehouse,
  GetListWarehouseParams,
  WarehouseCreateParams,
  WarehouseDeleteparams,
  ListWarehousePluck,
  ListWarehouseProduct,
  GetListProductWarehouseParams,
  WarehouseCenter,
} from './model/warehouseCenterModel'
import { ListSipperPluck } from './model/shipperModel'

import { defHttp } from '/@/utils/http/axios'
const indexApi = '/admin/warehouse-centers'

export const getListWarehouse = (params: GetListWarehouseParams) =>
  defHttp.get<ListWarehouse>({ url: indexApi, params })

export const createWarehouse = (params: WarehouseCreateParams) =>
  defHttp.post({ url: indexApi, params })

export const deleteWarehouse = (params: WarehouseDeleteparams) =>
  defHttp.delete({ url: indexApi + '/delete', params })

export const getPluckWarehouseCenter = () =>
  defHttp.get<ListWarehousePluck>({ url: indexApi + '/pluck' })

export const getWarehouseListProduct = (params: GetListProductWarehouseParams) =>
  defHttp.get<ListWarehouseProduct>({ url: indexApi + '/get-list-product', params })

export const getListShipper = () =>
  defHttp.get<ListSipperPluck>({ url: indexApi + '/get-list-shipper' })

export const getWarehouseCenter = (id: string | string[]) =>
  defHttp.get<WarehouseCenter>({ url: indexApi + '/' + id })

export const updateWarehouseCenter = (id: string | string[], params: WarehouseCreateParams) =>
  defHttp.put({ url: indexApi + '/' + id, params })
