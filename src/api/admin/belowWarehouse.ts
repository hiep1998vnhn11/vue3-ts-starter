import { defHttp } from '/@/utils/http/axios'
import { GetListBelowWarehouseParams, ListBelowWarehouse } from './model/belowWarehouseModel'
import { ExportShippingPriceResponse } from './model/shippingPriceModel'
const indexApi = '/admin/warehouse-below'

export const getBelowWarehouseList = (params: GetListBelowWarehouseParams) =>
  defHttp.get<ListBelowWarehouse>({ url: indexApi, params })

export const getExportData = (params: GetListBelowWarehouseParams) =>
  defHttp.get<ExportShippingPriceResponse>({ url: indexApi + '/export', params })
