import { defHttp } from '/@/utils/http/axios'
import {
  GetListProductParams,
  ListProduct,
  ListProductPluck,
  ShipperRequestProductParams,
  Warehouse,
} from './model/productModel'

import { Suggest } from '/@/api/admin/model/productModel'

const indexApi = '/shipper/products'
const warehouseApi = '/shipper/warehouse'
export const getListProduct = (params: GetListProductParams) =>
  defHttp.get<ListProduct>({ url: indexApi, params })

export const getListPluckProduct = () => defHttp.get<ListProductPluck>({ url: indexApi + '/pluck' })

export const requestImportProduct = (params: ShipperRequestProductParams) =>
  defHttp.post({ url: indexApi + '/request-import-product', params })

export const getWarehouse = () => defHttp.get<Warehouse>({ url: warehouseApi })
export const getProductSuggestForWarehouse = () =>
  defHttp.get<Suggest>({ url: indexApi + '/get-suggest' })
