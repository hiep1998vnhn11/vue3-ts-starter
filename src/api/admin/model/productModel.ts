import { BasicFetchResult } from '/@/api/model/baseModel'

export enum SyncResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
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
  amount: number
}

export interface UpdateMinInventoryParams {
  product_id: number
  amount: number
  key: string
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

export interface Suggest {
  [key: number]: number
}
