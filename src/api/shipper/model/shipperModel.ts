import { BasicFetchResult } from '/@/api/model/baseModel'

export interface ShipperModel {
  id: number
  email: string
  fullname: string
  phone: string
  address: string
  created_by: number
  updated_by: number
  updated_at: string
}

export interface ShipperPluckModel {
  id: number
  email: string
  fullname: string
  phone: string
}

export type ListShipper = BasicFetchResult<ShipperModel[]>

export type ListSipperPluck = ShipperPluckModel[]
