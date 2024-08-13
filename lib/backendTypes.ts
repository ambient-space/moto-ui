import type { Routes } from '../../moto-api/src/index'

type RestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

export type DeepKeys<T, Stop extends string = RestMethod> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? K extends Stop
          ? K
          : T[K] extends object
            ? `${K}/${DeepKeys<T[K], Stop>}`
            : K
        : never
    }[keyof T]
  : never

type R = DeepKeys<Routes>
type MethodPrepend<
  T extends string,
  S extends string = '',
> = T extends `${infer A}/${infer B}`
  ? MethodPrepend<B, `${S}/${A}`>
  : T extends RestMethod
    ? `${T}${S}`
    : never
type F = MethodPrepend<R>

type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
    ? []
    : S extends `${infer T}${D}${infer U}`
      ? [T, ...Split<U, D>]
      : [S]

type FilterParams<T extends readonly string[]> = T extends [infer First, ...infer Rest]
  ? First extends `:${string}`
    ? [First, ...FilterParams<Rest extends readonly string[] ? Rest : []>]
    : FilterParams<Rest extends readonly string[] ? Rest : []>
  : []

type ExtractParamNames<T extends readonly string[]> = T extends [
  `:${infer Param}`,
  ...infer Rest,
]
  ? [Param, ...ExtractParamNames<Rest extends readonly string[] ? Rest : []>]
  : []

type Args<T extends string> = Split<T, '/'>
type Params<T extends string> = {
  [K in ExtractParamNames<FilterParams<Args<T>>>[number]]: string
}

type FormattedString<T extends string> = T extends `${infer A}/${infer B}`
  ? A extends `:${string}`
    ? B extends 'index'
      ? `${string}`
      : `${string}/${FormattedString<B>}`
    : A extends RestMethod
      ? B extends 'index'
        ? ''
        : `/${FormattedString<B>}`
      : B extends 'index'
        ? `${A}`
        : `${A}/${FormattedString<B>}`
  : T extends `:${string}`
    ? `${string}`
    : T
type MappedRoutes = {
  [K in F]?: (args: Params<K>) => FormattedString<K>
}

export type { MappedRoutes }
