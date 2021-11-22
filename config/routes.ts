export default [
  { path: '/', redirect: '/home' },
  { path: '/home', name: '概览', component: './home' },
  {
    path: '/article',
    name: '文章管理',
    routes: [
      {
        path: '/article',
        redirect: '/article/list',
        hideInMenu: true,
      },
      {
        path: '/article/list',
        name: '文章管理',
        component: './article/list',
        hideInMenu: true,
      },
      {
        path: '/article/create',
        name: '创建文章',
        component: './article/update',
        hideInMenu: true,
      },
      {
        path: '/article/edit/:id',
        name: '编辑文章',
        component: './article/update',
        hideInMenu: true,
      },
      {
        path: '/article/:id',
        name: '查看文章',
        component: './article/detail',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/tag',
    name: '标签管理',
    routes: [
      {
        path: '/tag',
        redirect: '/tag/list',
        hideInMenu: true,
      },
      {
        path: '/tag/list',
        name: '标签管理',
        component: './tag/list',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/dataCenter',
    name: '数据中心',
    routes: [
      {
        path: '/dataCenter',
        redirect: '/dataCenter/search',
        hideInMenu: true,
      },
      {
        path: '/dataCenter/search',
        name: '数据查询',
        component: './dataCenter/search',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            path: '/user/login',
            name: '登录',
            component: './user/Login',
          },
        ],
      },
      { component: './404' },
    ],
  },
  { component: './404' },
];
