import {
  ListWarehouse,
  GetListWarehouseParams,
  WarehouseCreateParams,
  WarehouseDeleteparams,
  ListWarehousePluck,
  ListWarehouseProduct,
  GetListProductWarehouseParams,
  WarehouseDetail,
  WarehousePluckParams,
  AssignShipperParams,
} from './model/warehouseModel'
import { ListProduct } from './model/productModel'
import { ListSipperPluck } from './model/shipperModel'

import { defHttp } from '/@/utils/http/axios'
const indexApi = '/admin/warehouse'

export const getListWarehouse = (params: GetListWarehouseParams) =>
  defHttp.get<ListWarehouse>({ url: indexApi, params })

export const createWarehouse = (params: WarehouseCreateParams) =>
  defHttp.post({ url: indexApi, params })

export const deleteWarehouse = (params: WarehouseDeleteparams) =>
  defHttp.delete({ url: indexApi + '/delete', params })

export const getPluckWarehouse = (params: Nullable<WarehousePluckParams>) =>
  defHttp.get<ListWarehousePluck>({ url: indexApi + '/pluck', params })

export const getWarehouseListProduct = (params: GetListProductWarehouseParams) =>
  defHttp.get<ListWarehouseProduct>({ url: indexApi + '/get-list-product', params })

export const getListShipper = () =>
  defHttp.get<ListSipperPluck>({ url: indexApi + '/get-list-shipper' })

export const getDetailWarehouse = (id: string) =>
  defHttp.get<WarehouseDetail>({ url: indexApi + '/' + id })

export const getProductInWarehouse = (id: string, params: GetListWarehouseParams) =>
  defHttp.get<ListProduct>({ url: indexApi + '/' + id + '/get-list-product', params })

export const assignShipper = (params: AssignShipperParams) =>
  defHttp.post({ url: indexApi + '/assign-shipper', params })

export const updateWarehouse = (id: string, params: WarehouseCreateParams) =>
  defHttp.put({ url: indexApi + '/' + id, params })

export const gethistoryProduct = (id: string, params: any) =>
  defHttp.get({ url: indexApi + '/' + id + '/history-product', params })
export const getLogWarehouse = (params: any) =>
  defHttp.get({ url: indexApi + '/log-action', params })
