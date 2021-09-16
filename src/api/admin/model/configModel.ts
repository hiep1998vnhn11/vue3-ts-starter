export interface GetListConfigParams {
  page?: number
  search_key?: string
  limit?: string
}

export interface Config {
  id: string
  key: string
  value?: string
  name?: string
  comment?: string
}

export interface ConfigParams {
  key: string
  value: string
  comment: string
}
