import { string } from 'vue-types'
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
  range?: string
  start_date?: string
  shipper_id?: string | number | undefined
}

export interface SyncProductParams {
  page?: number
  limit?: number
}

export interface WarehouseDeleteparams {
  id: (string | number | undefined)[]
}

export interface ImportParams {
  dataSource: any[]
}

export interface ExportShippingPriceResponse {
  headers: string[]
  dataSource: any
}

export interface ShippingPriceParams {
  created_at: string
  shipper_id: string
  bill_id: string
  price: number
}
