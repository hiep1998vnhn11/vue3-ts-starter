import { defHttp } from '/@/utils/http/axios'
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  ChangePasswordParams,
  GetCodeParams,
  ResetPasswordParams,
  VerifySmsParams,
  FirstChangePasswordParams,
  UpdateInfoParams,
} from './model/userModel'

import { ErrorMessageMode } from '/#/axios'

enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  GetUserInfo = '/auth/me',
  GetPermCode = '/getPermCode',
  ChangePassword = '/auth/change-password',
  GetCode = '/auth/reset-password',
  ConfirmResetPassword = '/auth/confirm-reset-password',
  VerifySms = '/auth/verify-sms',
  FirstChangePassword = '/auth/first-change-password',
  ChangeUserInfo = '/auth/change-info',
  VerifyCode = '/auth/verify-code',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'message') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  )
}

export function verifySms(params: VerifySmsParams) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.VerifySms,
      params,
    },
    {
      errorMessageMode: 'message',
    }
  )
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo })
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode })
}

export function doLogout() {
  return defHttp.post({ url: Api.Logout })
}

export function changePassword(params: ChangePasswordParams) {
  return defHttp.post(
    { url: Api.ChangePassword, params },
    {
      errorMessageMode: 'modal',
    }
  )
}

export function firstChangePassword(params: FirstChangePasswordParams) {
  return defHttp.put({ url: Api.FirstChangePassword, params })
}

export function getCodeResetPassword(params: GetCodeParams) {
  return defHttp.post({ url: Api.GetCode, params })
}

export function resetPassword(params: ResetPasswordParams) {
  return defHttp.post({ url: Api.ConfirmResetPassword, params })
}

export function changeInfo(params: UpdateInfoParams) {
  return defHttp.put({ url: Api.ChangeUserInfo, params })
}

export function verifyCode(params: VerifySmsParams) {
  return defHttp.post({ url: Api.VerifyCode, params })
}
