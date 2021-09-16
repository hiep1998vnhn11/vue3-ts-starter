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

type ListProductImportWarehouse = { string: string }

export interface ImportWarehouseCreateParams {
  warehouse_id: string | number
  import_warehouse_id: string | number
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

export interface ImportWarehouseShow {
  id: string
  details: ImportWarehouseDetail[]
}
