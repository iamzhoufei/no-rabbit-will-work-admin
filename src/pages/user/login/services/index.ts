import { request } from 'umi';
import type { ILoginParams } from '../interface';

/** 登录接口 POST /api/login/account */
export async function login(body: ILoginParams) {
  return request<API.Response>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}
