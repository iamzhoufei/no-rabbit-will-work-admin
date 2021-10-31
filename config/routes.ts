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
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ name: '登录', path: '/user/login', component: './user/Login' }] },
      { component: './404' },
    ],
  },
  { component: './404' },
];
