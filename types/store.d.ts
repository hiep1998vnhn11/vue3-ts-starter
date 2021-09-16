import { ErrorTypeEnum } from '/@/enums/exceptionEnum'
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum'
export interface LockInfo {
  pwd?: string | undefined
  isLock?: boolean
}

// Error-log information
export interface ErrorLogInfo {
  type: ErrorTypeEnum
  file: string
  name?: string
  message: string
  stack?: string
  detail: string
  url: string
  time?: string
}

export interface UserInfo {
  id: string | number
  fullname: string
  phone: string
  email?: string
  link_id?: string
  telegram_session?: string
  status: number
  total_new?: number
  verify_code?: string
  description?: string
}

export interface BeforeMiniState {
  menuCollapsed?: boolean
  menuSplit?: boolean
  menuMode?: MenuModeEnum
  menuType?: MenuTypeEnum
}
