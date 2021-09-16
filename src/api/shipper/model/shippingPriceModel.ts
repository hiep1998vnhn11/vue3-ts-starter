import { BasicFetchResult } from '/@/api/model/baseModel'

export interface ShippingPrice {
  id: number
  bill_id: string
  shipper_id: string | number
  created_at: string
  shipper_name: string
  shipper_phone: string
}

export type ListShippingPrice = BasicFetchResult<ShippingPrice[]>

export interface WarehouseCreateParams {
  name: string
  description?: string
  shipper_id: number | string
}

export interface GetListShippingPriceParams {
  page?: number
  search_key?: string
  limit?: string
}

export interface SyncProductParams {
  page?: number
  limit?: number
}

export interface WarehouseDeleteparams {
  id: (string | number | undefined)[]
}
