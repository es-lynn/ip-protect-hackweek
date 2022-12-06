/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface MeIpAddressRes {
  ipv4: string
  ipv6?: string
}

export interface Project {
  id: string
  friendlyId: string
}

export interface MeProjectListRes {
  projects: Project[]
}

export interface ListResIpAddress {
  id: string
  ip: string
  tag: string
  synced: boolean
}

export interface IpAddressListRes {
  ipAddresses: ListResIpAddress[]
}

export interface IpAddressAddBody {
  ip: string
  tag: string
}

export interface IpAddress {
  id: string
  ip: string
  tag: string
}

export interface IpAddressAddRes {
  ipAddress: IpAddress
}

export interface IpAddressRemoveBody {
  ipAddress: string
}

export type IpAddressRemoveRes = object

export interface Webpage {
  id: string
  name: string
  url: string
}

export interface ListRes {
  users: User[]
}

export interface AddBody {
  id: string
  isAdmin: boolean
}

export interface AddRes {
  user: User
}

export interface EditBody {
  name?: string
  url?: string
}

export interface EditRes {
  webpage: Webpage
}

export type DeleteRes = object

export interface AuthLoginBody {
  code: string
}

export interface AuthLoginRes {
  accessToken: string
}

export type User = object

export interface EditRoleBody {
  isAdmin: boolean
}

export interface EditRoleRes {
  user: User
}

export type RemoveRes = object

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`
    )}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter(
      key => 'undefined' !== typeof query[key]
    )
    return keys
      .map(key =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
  }

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {})
        },
        signal: cancelToken
          ? this.createAbortSignal(cancelToken)
          : requestParams.signal,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body)
      }
    ).then(async response => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch(e => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title API Documentation - IProtect
 * @version 0.0.0
 * @contact
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  me = {
    /**
     * No description
     *
     * @tags /me
     * @name MeIpAddress
     * @request GET:/me/ip-address
     * @secure
     */
    meIpAddress: (params: RequestParams = {}) =>
      this.request<MeIpAddressRes, any>({
        path: `/me/ip-address`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /me
     * @name MeProjectsList
     * @request GET:/me/project/list
     * @secure
     */
    meProjectsList: (params: RequestParams = {}) =>
      this.request<MeProjectListRes, any>({
        path: `/me/project/list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      })
  }
  project = {
    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/user/@me/ip-address
     * @name IpaddressList
     * @request GET:/project/{projectFriendlyId}/user/@me/ip-address/list
     * @secure
     */
    ipaddressList: (projectFriendlyId: string, params: RequestParams = {}) =>
      this.request<IpAddressListRes, any>({
        path: `/project/${projectFriendlyId}/user/@me/ip-address/list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/user/@me/ip-address
     * @name IpaddressAdd
     * @request POST:/project/{projectFriendlyId}/user/@me/ip-address/add
     * @secure
     */
    ipaddressAdd: (
      projectFriendlyId: string,
      data: IpAddressAddBody,
      params: RequestParams = {}
    ) =>
      this.request<IpAddressAddRes, any>({
        path: `/project/${projectFriendlyId}/user/@me/ip-address/add`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/user/@me/ip-address
     * @name IpaddressRemove
     * @request POST:/project/{projectFriendlyId}/user/@me/ip-address/remove
     * @secure
     */
    ipaddressRemove: (
      projectFriendlyId: string,
      data: IpAddressRemoveBody,
      params: RequestParams = {}
    ) =>
      this.request<IpAddressRemoveRes, any>({
        path: `/project/${projectFriendlyId}/user/@me/ip-address/remove`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/webpage
     * @name WebpageList
     * @request GET:/project/{projectFriendlyId}/webpage/list
     * @secure
     */
    webpageList: (projectFriendlyId: string, params: RequestParams = {}) =>
      this.request<ListRes, any>({
        path: `/project/${projectFriendlyId}/webpage/list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/webpage
     * @name WebpageAdd
     * @request POST:/project/{projectFriendlyId}/webpage/add
     * @secure
     */
    webpageAdd: (
      projectFriendlyId: string,
      data: AddBody,
      params: RequestParams = {}
    ) =>
      this.request<AddRes, any>({
        path: `/project/${projectFriendlyId}/webpage/add`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/webpage
     * @name WebpageEdit
     * @request POST:/project/{projectFriendlyId}/webpage/{webpageId}/edit
     * @secure
     */
    webpageEdit: (
      projectFriendlyId: string,
      webpageId: string,
      data: EditBody,
      params: RequestParams = {}
    ) =>
      this.request<EditRes, any>({
        path: `/project/${projectFriendlyId}/webpage/${webpageId}/edit`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/webpage
     * @name WebpageDelete
     * @request POST:/project/{projectFriendlyId}/webpage/{webpageId}/delete
     * @secure
     */
    webpageDelete: (
      projectFriendlyId: string,
      webpageId: string,
      params: RequestParams = {}
    ) =>
      this.request<DeleteRes, any>({
        path: `/project/${projectFriendlyId}/webpage/${webpageId}/delete`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/user
     * @name UserList
     * @request GET:/project/{projectFriendlyId}/user/list
     * @secure
     */
    userList: (projectFriendlyId: string, params: RequestParams = {}) =>
      this.request<ListRes, any>({
        path: `/project/${projectFriendlyId}/user/list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/user
     * @name UserAdd
     * @request POST:/project/{projectFriendlyId}/user/add
     * @secure
     */
    userAdd: (
      projectFriendlyId: string,
      data: AddBody,
      params: RequestParams = {}
    ) =>
      this.request<AddRes, any>({
        path: `/project/${projectFriendlyId}/user/add`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/user
     * @name UserRoleEdit
     * @request POST:/project/{projectFriendlyId}/user/{userId}/role/edit
     * @secure
     */
    userRoleEdit: (
      projectFriendlyId: string,
      userId: string,
      data: EditRoleBody,
      params: RequestParams = {}
    ) =>
      this.request<EditRoleRes, any>({
        path: `/project/${projectFriendlyId}/user/${userId}/role/edit`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/user
     * @name UserRemove
     * @request POST:/project/{projectFriendlyId}/user/{userId}/remove
     * @secure
     */
    userRemove: (
      projectFriendlyId: string,
      userId: string,
      params: RequestParams = {}
    ) =>
      this.request<RemoveRes, any>({
        path: `/project/${projectFriendlyId}/user/${userId}/remove`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params
      })
  }
  auth = {
    /**
     * No description
     *
     * @tags /auth
     * @name AuthLogin
     * @request POST:/auth/login
     */
    authLogin: (data: AuthLoginBody, params: RequestParams = {}) =>
      this.request<AuthLoginRes, any>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
}
