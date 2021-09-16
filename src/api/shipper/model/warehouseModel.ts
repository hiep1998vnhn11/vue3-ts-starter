import { BasicFetchResult } from '/@/api/model/baseModel'

export interface Warehouse {
  id: number
  fullname: string
  shipper_id: string | number
  created_at: string
  shipper_name: string
  shipper_phone: string
}

export interface WarehousePluck {
  id: number | string
  fullname: string
}
export type ListWarehouse = BasicFetchResult<Warehouse[]>
export type ListWarehousePluck = WarehousePluck[]

export interface WarehouseCreateParams {
  name: string
  description?: string
  shipper_id: number | string
}

export interface GetListWarehouseParams {
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

export interface WarehouseProduct {
  sku?: string
  id: string
  name: string
  inventory: number
}

export type ListWarehouseProduct = BasicFetchResult<WarehouseProduct[]>
