import { defHttp } from '/@/utils/http/axios'
import { DashboardData } from './model/dashboardModel'
const indexApi = '/shipper/dashboard'

export const getDashboard = () => defHttp.get<DashboardData>({ url: indexApi })
