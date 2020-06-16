export const routes = [
  {
    key: 'home',
    path: '/',
    exact: true,
    name: 'Home',
    component: 'pages/home'
  },
  {
    key: 'list',
    path: '/list',
    name: 'List',
    component: 'pages/list'
  },
  {
    key: 'detail',
    path: '/detail/:id',
    name: 'Detail',
    component: 'pages/detail'
  },
  {
    key: 'tools',
    path: '/tools',
    name: 'Tools',
    component: 'pages/tools'
  }
]