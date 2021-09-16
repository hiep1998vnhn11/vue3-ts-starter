import { BasicFetchResult } from '/@/api/model/baseModel'
import { WarehouseDetail } from './warehouseModel'
export interface ShipperModel {
  id?: number
  email?: string
  name?: string
  phone?: string
  address?: string
  created_by?: number
  updated_by?: number
  updated_at?: string
}
interface User {
  id?: number
  status?: number
  telegram_session?: string
  created_at?: string
  created_by?: number
}
export interface ShipperDetail {
  id: number
  phone: string
  name: string
  address: string
  created_at: string
  warehouse: WarehouseDetail | null
  user: User
}

export interface ShipperPluckModel {
  id: number
  name: string
  phone: string
}
export type ListSipperPluck = ShipperPluckModel[]

export type ListShipper = BasicFetchResult<ShipperModel[]>
