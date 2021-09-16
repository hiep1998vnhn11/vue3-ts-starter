import { defHttp } from '/@/utils/http/axios'
import { GetListConfigParams, Config, ConfigParams } from './model/configModel'

const indexApi = '/admin/configs'

export const getListConfig = (params: GetListConfigParams) =>
  defHttp.get<Config[]>({ url: indexApi, params })

export const deleteConfig = (id: string) => defHttp.delete<Config[]>({ url: indexApi + '/' + id })

export const createConfig = (params: ConfigParams) => defHttp.post({ url: indexApi, params })

export const updateConfig = (id: string, params: ConfigParams) =>
  defHttp.put({ url: indexApi + '/' + id, params })

export const getConfig = (id: string) => defHttp.get<Config>({ url: indexApi + '/' + id })
