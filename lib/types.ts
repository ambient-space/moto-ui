export type TAxiosSuccessResponse<T> = {
  data: T
  error: null
}

export type TAxiosErrorResponse = {
  data: null
  error: { message: string } & Record<string, any>
}

export type TAxiosResponse<T> = TAxiosSuccessResponse<T> | TAxiosErrorResponse
