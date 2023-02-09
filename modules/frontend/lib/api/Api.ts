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

export interface User {
  id: string
  name: string
  provider: string
  providerId: string
  picture: string
}

export interface MeRes {
  user: User
}

export interface MeIpAddressRes {
  ipv4: string
  ipv6?: string
}

export interface Project {
  id: string
  friendlyId: string
  ipType: 'ipv4' | 'ipv6'
}

export interface MeProjectListRes {
  projects: Project[]
}

export interface IpSet {
  id: string
  name: string
  region: string
}

export interface ProjectCreateBody {
  ipset: IpSet
  ipsetV6: IpSet
  friendlyId: string
  awsAccessKey: string
  awsSecret: string
  ipType: 'ipv4' | 'ipv6'
}

export interface Project3734 {
  id: string
  friendlyId: string
  ipset: IpSet
  ipsetV6: IpSet
  awsAccessKey: string
  awsSecret: string
  ipType: 'ipv4' | 'ipv6'
}

export interface ProjectCreateRes {
  project: Project3734
}

export interface ProjectEditBody {
  ipset?: IpSet
  ipsetV6?: IpSet
  friendlyId?: string
  awsAccessKey?: string
  awsSecret?: string
  ipType: 'ipv4' | 'ipv6'
}

export interface ProjectEditRes {
  project: Project3734
}

export interface Project5239 {
  id: string
  friendlyId: string
  ipType: 'ipv4' | 'ipv6'
}

export interface ProjectViewRes {
  project: Project5239
  isAdmin: boolean
}

export type ProjectDeleteRes = object

export interface ListResIpAddress {
  id: string
  ip: string
  tag: string
  /** @format date-time */
  createdAt: Date
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
  /** @format date-time */
  createdAt: Date
}

export interface IpAddressAddRes {
  ipAddress: IpAddress
}

export interface IpAddressRemoveBody {
  ipAddress: string
}

export type IpAddressRemoveRes = object

export interface IpAddressWhitelistedRes {
  isWhitelisted: boolean
  isMyIp?: boolean
  ipAddress?: IpAddress
  user?: User
}

export type IpAddressReportRes = object

export interface Webpage {
  id: string
  name: string
  url: string
}

export interface WebpageListRes {
  webpages: Webpage[]
}

export interface WebpageAddBody {
  name: string
  url: string
}

export interface WebpageAddRes {
  webpage: Webpage
}

export interface WebpageEditBody {
  name?: string
  url?: string
}

export interface WebpageEditRes {
  webpage: Webpage
}

export type WebpageDeleteRes = object

export interface AuthRegisterBody {
  code: string
  idToken: string
}

export type AuthRegisterRes = object

export interface UserSearchRes {
  users: User[]
}

export interface ProjectUser {
  id: string
  name: string
  provider: string
  providerId: string
  isAdmin: boolean
}

export interface UserListRes {
  users: ProjectUser[]
}

export interface UserAddBody {
  id: string
  isAdmin: boolean
}

export interface UserAddRes {
  user: ProjectUser
}

export interface UserEditRoleBody {
  isAdmin: boolean
}

export interface UserEditRoleRes {
  user: ProjectUser
}

export type UserRemoveRes = object

export interface InvitationCreateBody {
  /** @max 604800 */
  expiresIn: number
  providerId?: string
}

export interface InvitationCreateRes {
  url: string
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType
} from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    })
  }
}

/**
 * @title API Documentation - IProtect
 * @version 0.0.0
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  me = {
    /**
     * No description
     *
     * @tags /me
     * @name MeIndex
     * @request GET:/me
     * @secure
     */
    meIndex: (params: RequestParams = {}) =>
      this.request<MeRes, any>({
        path: `/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

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
     * @tags /project
     * @name ProjectCreate
     * @request POST:/project/create
     * @secure
     */
    projectCreate: (data: ProjectCreateBody, params: RequestParams = {}) =>
      this.request<ProjectCreateRes, any>({
        path: `/project/create`,
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
     * @tags /project
     * @name ProjectEdit
     * @request PATCH:/project/{projectFriendlyId}/edit
     * @secure
     */
    projectEdit: (projectFriendlyId: string, data: ProjectEditBody, params: RequestParams = {}) =>
      this.request<ProjectEditRes, any>({
        path: `/project/${projectFriendlyId}/edit`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project
     * @name ProjectView
     * @request GET:/project/{projectFriendlyId}
     * @secure
     */
    projectView: (projectFriendlyId: string, params: RequestParams = {}) =>
      this.request<ProjectViewRes, any>({
        path: `/project/${projectFriendlyId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project
     * @name ProjectDelete
     * @request POST:/project/{projectFriendlyId}/delete
     * @secure
     */
    projectDelete: (projectFriendlyId: string, params: RequestParams = {}) =>
      this.request<ProjectDeleteRes, any>({
        path: `/project/${projectFriendlyId}/delete`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId
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
     * @tags /project/:projectFriendlyId
     * @name IpaddressAdd
     * @request POST:/project/{projectFriendlyId}/user/@me/ip-address/add
     * @secure
     */
    ipaddressAdd: (projectFriendlyId: string, data: IpAddressAddBody, params: RequestParams = {}) =>
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
     * @tags /project/:projectFriendlyId
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
     * @tags /project/:projectFriendlyId
     * @name IpaddressWhitelisted
     * @request GET:/project/{projectFriendlyId}/user/@me/ip-address/whitelisted
     * @secure
     */
    ipaddressWhitelisted: (
      projectFriendlyId: string,
      query: {
        ipAddress: string
      },
      params: RequestParams = {}
    ) =>
      this.request<IpAddressWhitelistedRes, any>({
        path: `/project/${projectFriendlyId}/user/@me/ip-address/whitelisted`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId
     * @name IpaddressWhitelistedV6
     * @request GET:/project/{projectFriendlyId}/user/@me/ip-address/v6/whitelisted
     * @secure
     */
    ipaddressWhitelistedV6: (
      projectFriendlyId: string,
      query: {
        ipAddress: string
      },
      params: RequestParams = {}
    ) =>
      this.request<IpAddressWhitelistedRes, any>({
        path: `/project/${projectFriendlyId}/user/@me/ip-address/v6/whitelisted`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId
     * @name IpaddressView
     * @request GET:/project/{projectFriendlyId}/ip-address/report
     * @secure
     */
    ipaddressView: (projectFriendlyId: string, params: RequestParams = {}) =>
      this.request<IpAddressReportRes, any>({
        path: `/project/${projectFriendlyId}/ip-address/report`,
        method: 'GET',
        secure: true,
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
      this.request<WebpageListRes, any>({
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
    webpageAdd: (projectFriendlyId: string, data: WebpageAddBody, params: RequestParams = {}) =>
      this.request<WebpageAddRes, any>({
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
      data: WebpageEditBody,
      params: RequestParams = {}
    ) =>
      this.request<WebpageEditRes, any>({
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
    webpageDelete: (projectFriendlyId: string, webpageId: string, params: RequestParams = {}) =>
      this.request<WebpageDeleteRes, any>({
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
      this.request<UserListRes, any>({
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
    userAdd: (projectFriendlyId: string, data: UserAddBody, params: RequestParams = {}) =>
      this.request<UserAddRes, any>({
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
      data: UserEditRoleBody,
      params: RequestParams = {}
    ) =>
      this.request<UserEditRoleRes, any>({
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
    userRemove: (projectFriendlyId: string, userId: string, params: RequestParams = {}) =>
      this.request<UserRemoveRes, any>({
        path: `/project/${projectFriendlyId}/user/${userId}/remove`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags /project/:projectFriendlyId/invitation
     * @name InvitationCreate
     * @request POST:/project/{projectFriendlyId}/invitation/create
     * @secure
     */
    invitationCreate: (
      projectFriendlyId: string,
      data: InvitationCreateBody,
      params: RequestParams = {}
    ) =>
      this.request<InvitationCreateRes, any>({
        path: `/project/${projectFriendlyId}/invitation/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  auth = {
    /**
     * No description
     *
     * @tags /auth
     * @name AuthRegister
     * @request POST:/auth/register
     */
    authRegister: (data: AuthRegisterBody, params: RequestParams = {}) =>
      this.request<AuthRegisterRes, any>({
        path: `/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
  user = {
    /**
     * No description
     *
     * @tags /user
     * @name UserSearch
     * @request GET:/user/search
     * @secure
     */
    userSearch: (
      query: {
        q: string
      },
      params: RequestParams = {}
    ) =>
      this.request<UserSearchRes, any>({
        path: `/user/search`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      })
  }
}
