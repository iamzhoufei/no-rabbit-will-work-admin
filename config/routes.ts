export default [
  { path: '/', redirect: '/home' },
  { path: '/home', name: '概览', component: './home' },
  {
    path: '/article',
    name: '文章管理',
    component: './article/list',
    routes: [
      {
        path: '/article/:id',
        name: '文章详情',
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
