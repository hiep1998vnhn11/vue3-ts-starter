import { BasicFetchResult } from '/@/api/model/baseModel'

export interface ListAccount {
  id: number
  email: string
  fullname: string
  phone: string
  address: string
  ahamove_id: string
  created_by: number
  updated_by: number
  updated_at: string
}

export type ListShipper = BasicFetchResult<ListAccount>

export interface ChangePasswordParams {
  user_id: string
  password: string
  password_confirmation: string
}

export interface AccountCreateParams {
  fullname: string
  phone: string
  email: string
  password: string
  password_confirmation: string
  description: string
  ahamove_id?: string
  role: string
}

export interface GetListAccountParams {
  page?: number
  search_key?: string
  role?: string
  limit?: string
}
