import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import type { ResponseError, RequestOptionsInit } from 'umi-request';

import { history } from 'umi';
import RightContent from '@/components/rightContent';
import Footer from '@/components/footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import Cookies from 'js-cookie';
import { notification } from 'antd';
import { regex } from './utils';

import environment from '../environment';
import { CodeMessage } from './interface';

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => {
      const { location } = history;
      if (location.pathname === '/article/create') return null;
      return <Footer />;
    },
    onPageChange: () => {
      // const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

/** 异常处理程序 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = CodeMessage[response.status] || response.statusText;
    // const { status, url } = response;

    notification.error({
      // message: `请求错误 ${status}: ${url}`,
      message: '请求发生错误',
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      message: '网络异常',
      description: '您的网络发生异常，无法连接服务器。',
    });
  }

  return response;
};

const requestInterceptors = [
  (url: string, options: RequestOptionsInit) => {
    const BearerInCookie = Cookies.get('Bearer') || ''; // 直接从cookie中获取的token
    // const BearerInLocalStorage = (window.localStorage && window.localStorage.getItem('Bearer')) || '';

    const path = !regex?.isUrl(url) ? `${environment[REACT_APP_ENV]}${url}` : url;

    console.log(`request : ${path}`);

    return {
      url: path,
      options: {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          Authorization: BearerInCookie || '',
        },
        interceptors: true,
      },
    };
  },
];

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors,
};
