export interface BasicPageParams {
  page: number
  pageSize: number
}

export interface BasicFetchResult<T extends any> {
  data: T[]
  total: number
  current_page: number
  per_page: number
}

export interface BasicResponseMessage {
  result: any
  message: string
  code: number
}
