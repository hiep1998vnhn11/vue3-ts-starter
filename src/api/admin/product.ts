import { defHttp } from '/@/utils/http/axios'
import {
  SyncProductParams,
  SyncResponse,
  GetListProductParams,
  ListProduct,
  UpdateMinInventoryParams,
  ListProductPluck,
  Suggest,
} from './model/productModel'

const indexApi = '/admin/products'

export const syncProductApi = (params: SyncProductParams) =>
  defHttp.post<SyncResponse>({ url: indexApi + '/sync', params })

export const getListProduct = (params: GetListProductParams) =>
  defHttp.get<ListProduct>({ url: indexApi, params })

export const updateMinInventory = (params: UpdateMinInventoryParams) =>
  defHttp.post({
    url: indexApi + '/update-min-inventory',
    params,
  })

export const getProductPluck = () => defHttp.get<ListProductPluck>({ url: indexApi + '/pluck' })

export const getProductSuggestForWarehouse = (params: { warehouse_id: number }) =>
  defHttp.get<Suggest>({ url: indexApi + '/get-suggest', params })
