import { BasicFetchResult } from '/@/api/model/baseModel'

export enum SyncResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Order {
  id: number
  order_code: string
  bill_code: string
  warehouse_id: string
  shipper_id: string
  status: number
  status_ship: number
  created_at: number
  updated_at: string
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

export interface SyncOrderParams {
  page?: number
  limit?: number
}
export interface SyncResponse {
  page: number
  status: SyncResponseStatus
  done?: boolean
}

export interface OrderDetail {
  id?: string
  shipper?: any
  warehouse?: any
  warehouse_id?: number
  details?: Detail[]
}

export interface Detail {
  id: string
  quantity: number
  sku: string
  name: string
}
