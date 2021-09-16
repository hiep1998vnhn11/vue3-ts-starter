import { BasicFetchResult } from '/@/api/model/baseModel'
import { ShipperModel } from './shipperModel'
export interface Warehouse {
  id: number
  fullname: string
  shipper_id: string | number
  created_at: string
  shipper_name: string
  shipper_phone: string
}

export interface WarehouseDetail {
  id: number
  fullname: string
  shipper_id?: number
  shipper: ShipperModel | null
  description?: string
  created_at: string
  updated_at: string
}

export interface WarehousePluck {
  id: number | string
  fullname: string
}
export type ListWarehouse = BasicFetchResult<Warehouse[]>
export type ListWarehousePluck = WarehousePluck[]

export interface WarehouseCreateParams {
  fullname: string
  description?: string
  shipper_id?: number | string
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

export interface WarehousePluckParams {
  no_shipper?: boolean
}

export interface AssignShipperParams {
  shipper_id: string
  warehouse_id: string
}
