import { defHttp } from '/@/utils/http/axios'
import { ReportWarehouse } from './model/reportWarehouse'
const indexApi = '/admin/warehouse-products'

export const getReport = (params: any) => defHttp.get<ReportWarehouse>({ url: indexApi, params })

export const getListWarehouse = () => defHttp.get({ url: indexApi + '/list-warehouse' })
