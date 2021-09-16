import { BasicFetchResult } from '/@/api/model/baseModel'

export interface ImportWarehouse {
  id: number
  code: string
  warehouse_name: string
  import_warehouse_name: string
  status: string | number
  created_at: string
}

export type ListImportWarehouse = BasicFetchResult<ImportWarehouse[]>

type ListProductImportWarehouse = { string: string } | {}

export interface ImportWarehouseCreateParams {
  warehouse_id: string | number | null
  import_warehouse_id: string | number | null
  products: ListProductImportWarehouse
  description?: string
}

export interface GetListImportWarehouseParams {
  page?: number
  search_key?: string
  limit?: string
}

export interface ImportWarehouseDetail {
  id: string
  sku: string
  product_id: string
  name: string
  amount: number
  created_at: string
}

interface Warehouse {
  id: string
  fullname: string
}

export interface ImportPluck {
  value: number | string
  text: string
}
export interface ImportWarehouseShow {
  id: string
  code: string
  created_at: string
  updated_at: string
  warehouse: Warehouse
  import_warehouse: Warehouse
  status: number
  descriptions: string
  products: ImportWarehouseDetail[]
}

export interface AcceptImportProductParams {
  id: string | string[]
  status?: string
}

export interface DetailProduct {
  id: number
  product_id: number
  total: number
  name: string
  sku: string
  amount?: number
}
