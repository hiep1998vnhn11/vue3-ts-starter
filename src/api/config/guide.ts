import { defHttp } from '/@/utils/http/axios'
const indexApi = '/guide'

export const getTelegramGuide = () => defHttp.get({ url: indexApi + '/telegram' })
