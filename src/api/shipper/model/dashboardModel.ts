import { Warehouse } from './warehouseModel'

export interface DashboardData {
  warehouse: Nullable<Warehouse>
  warehouse_count?: number
  product_count?: number
  order_count?: number
  product_lower_sum?: number
  warehouse_product_sum?: number
}
