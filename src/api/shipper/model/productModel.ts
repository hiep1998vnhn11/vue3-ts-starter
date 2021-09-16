import { BasicFetchResult } from '/@/api/model/baseModel'

export enum SyncResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}
export type ProductSelected = { number: number } | {}

export interface ShipperRequestProductParams {
  products: ProductSelected
}
export interface Product {
  id: number
  alias: string
  name: string
  updated_at: string
  inventory: string | number
}

export interface ProductPluck {
  id: number
  name: string
  sku: string
}

export type ListProduct = BasicFetchResult<Product[]>
export type ListProductPluck = ProductPluck[]

export interface AccountCreateParams {
  fullname: string
  phone: string
  email: string
  password: string
  password_confirmation: string
  description: string
  role: string
}

export interface GetListProductParams {
  page?: number
  search_key?: string
  limit?: string
}

export interface SyncProductParams {
  page?: number
  limit?: number
}

export interface SyncResponse {
  page: number
  status: SyncResponseStatus
  done?: boolean
}

export interface Warehouse {
  fullname: string
  total_order: number
  created_at: string
}
