import { BasicFetchResult } from '/@/api/model/baseModel'

export interface CheckWarehouse {
  id: number
  code: string
  warehouse_name: string
  import_warehouse_name: string
  status: string | number
  created_at: string
}

export type ListCheckWarehouse = BasicFetchResult<CheckWarehouse>

type ListProductCheckWarehouse = { string: string }

export interface CheckWarehouseCreateParams {
  warehouse_id: string | number
  import_warehouse_id: string | number
  products: ListProductCheckWarehouse
  description?: string
}

export interface GetListCheckWarehouseParams {
  page?: number
  search_key?: string
  limit?: string
}
