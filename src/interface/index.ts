export enum CodeMessage {
  '服务器成功返回请求的数据。' = 200,
  '新建或修改数据成功。' = 201,
  '一个请求已经进入后台排队（异步任务）。' = 202,
  '删除数据成功。' = 203,
  '发出的请求有错误，服务器没有进行新建或修改数据的操作。' = 400,
  '用户没有权限（令牌、用户名、密码错误）。' = 401,
  '用户得到授权，但是访问是被禁止的。' = 403,
  '发出的请求针对的是不存在的记录，服务器没有进行操作。' = 404,
  '请求方法不被允许。' = 405,
  '请求的格式不可得。' = 406,
  '请求的资源被永久删除，且不会再得到的。' = 410,
  '当创建一个对象时，发生一个验证错误。' = 422,
  '服务器发生错误，请检查服务器。' = 500,
  '网关错误。' = 502,
  '服务不可用，服务器暂时过载或维护。' = 503,
  '网关超时。' = 504,
}

//  根据 model/type 的组合来区分是哪套分类
export enum MultiplexModel {
  '游戏' = 'game',
  '广告' = 'schedule',
  '玩家数据' = 'account',
  '冲级排名赛' = 'ranking',
  '充值' = 'topup',
}

export enum MultiplexType {
  '游戏类型' = 'meta_type',
  '游戏标签' = 'topic_type',
  '申请理由' = 'apply_group',
  '审核理由' = 'audit_group',
}

export interface NumberId {
  id: number;
}

export interface NumberOption {
  name: string;
  value: number;
}

export interface StringOption {
  name: string;
  value: string;
}

export interface Attribute {
  name: string;
  value: string;
}

export interface SimpleSearchList {
  page: number;
  per_page: number;
  search_content: string;
}

export interface OssFileItem {
  _id: string;
  title: string;
  url: string;
  path: string;
  storage: string;
  detail?: any;
}

export interface OssFileId {
  _id: string;
}

export interface User {
  avatar: string;
  channel_partner_id: null | string;
  email: null | string;
  email_verified_at: null | string;
  id: number | null;
  // identity: Identity;
  is_notifiable: number | null;
  is_staff: number | null;
  login_name: string;
  merchant_partner_id: string;
  mobile: string;
  status: number | null;
  username: string;
}
