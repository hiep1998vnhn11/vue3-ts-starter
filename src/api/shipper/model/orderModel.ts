import { BasicFetchResult } from '/@/api/model/baseModel'

export interface Warehouse {
  id: string
  fullname: string
}

export interface Order {
  id: number
  order_code: string
  warehouse_id: string
  status: number
  bill_cde: string
  status_ship: number
  created_at: number
  warehouse: Warehouse
}

export type ListOrder = BasicFetchResult<Order[]>

export interface AccountCreateParams {
  fullname: string
  phone: string
  email: string
  password: string
  password_confirmation: string
  description: string
  role: string
}

export interface GetListOrderParams {
  page?: number
  search_key?: string
  role?: string
  limit?: string
}
export interface OrderDetail {
  id: string
  quantity: number
  sku: string
  name: string
}

export interface OrderDetailResponse {
  order: Order
  details: OrderDetail[]
}
