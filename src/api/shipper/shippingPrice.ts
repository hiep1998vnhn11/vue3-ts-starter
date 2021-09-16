import { ListShippingPrice } from './model/shippingPriceModel'
import { defHttp } from '/@/utils/http/axios'
const indexApi = '/shipper/shipping-price'

export const getListShippingPrice = () => defHttp.get<ListShippingPrice>({ url: indexApi })
