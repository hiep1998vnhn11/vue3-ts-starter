import { BasicFetchResult } from '/@/api/model/baseModel'

export interface Warehouse {
  id: number
  fullname: string
  shipper_id: string | number
  created_at: string
  shipper_name: string
  shipper_phone: string
}

export interface WarehouseCenter {
  id?: number
  name: string
  address: string
  phone: string
  description?: string
  created_at?: string
}

export interface WarehousePluck {
  id: number | string
  name: string
  phone: string
  address: string
}
export type ListWarehouse = BasicFetchResult<Warehouse[]>
export type ListWarehousePluck = WarehousePluck[]

export interface WarehouseCreateParams {
  name: string
  address: string
  phone: string
  description?: string
}

export interface GetListWarehouseParams {
  page?: number
  search_key?: string
  limit?: string
}

export interface GetListProductWarehouseParams {
  page?: number
  limit?: number
  warehouse_id: number
}

export interface SyncProductParams {
  page?: number
  limit?: number
}

export interface WarehouseDeleteparams {
  id: (string | number | undefined)[]
}

export interface WarehouseProduct {
  sku: string
  id: string
  name: string
  total: number
  product_id: number
}

export type ListWarehouseProduct = WarehouseProduct[]
