import { defHttp } from '/@/utils/http/axios'
import { ListSipperPluck, ShipperDetail } from './model/shipperModel'
import { SyncProductParams, SyncResponse } from './model/productModel'
const indexApi = '/admin/shippers'
const pluckApi = '/admin/shippers/pluck'

export const getListShipper = () => defHttp.get<ListSipperPluck>({ url: pluckApi })

export const syncShipper = (params: SyncProductParams) =>
  defHttp.post<SyncResponse>({ url: indexApi + '/sync', params })

export const getDetailShipper = (id: string | null) =>
  defHttp.get<ShipperDetail>({ url: indexApi + '/' + id })
