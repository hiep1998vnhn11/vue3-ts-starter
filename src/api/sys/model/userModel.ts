/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  email: string
  password: string
}

export interface RoleInfo {
  name: string
  id: string
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  access_token: string
  expires_in: number
  token_type: string
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[]
  id: number
  fullname: string
  shortname: string
  email: string
  max_id: number
  phone: string
  link_id?: number
  telegram_session?: string
}

export interface ChangePasswordParams {
  password: string
  old_password: string
  password_confirmation: string
}

export interface FirstChangePasswordParams {
  password: string
  password_confirmation: string
}

export interface GetCodeParams {
  phone: string
}

export interface ResetPasswordParams {
  phone: string
  code: string
  password: string
  password_confirmation: string
}

export interface VerifySmsParams {
  phone: string
  code: string
}

export interface UpdateInfoParams {
  fullname: string
}
