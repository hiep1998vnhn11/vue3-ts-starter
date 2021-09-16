import { BasicFetchResult } from '/@/api/model/baseModel'

export interface CheckWarehouse {
  id: number
  code: string
  warehouse_name: string
  import_product_code: string
  status: string | number
  created_at: string
  import_product_id: number
}

export type ListCheckWarehouse = BasicFetchResult<CheckWarehouse>

type ListProductCheckWarehouse = { string: string } | {}

export interface ListBelowWarehouse {
  warehouse_id: string | number | null
  products: ListProductCheckWarehouse
  description?: string
}

export interface GetListBelowWarehouseParams {
  page?: number
  search_key?: string
  limit?: string
}
interface Warehouse {
  id: string
  fullname: string
}
export interface CheckWarehouseDetail {
  id: string
  sku: string
  product_id: string
  name: string
  current_amount: number
  created_at: string
}
export interface CheckWarehouseShow {
  id: string
  code: string
  created_at: string
  updated_at: string
  warehouse: Warehouse
  import_warehouse: Warehouse
  status: number
  descriptions: string
  products: Product[]
}

export interface AcceptCheckProductParams {
  id: string | string[]
  status?: string
}

export interface Product {
  id: number
  product_id: number
  name: string
  sku: string
  current_amount?: number
  real_amount?: number
}
