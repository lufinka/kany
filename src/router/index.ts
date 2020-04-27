import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: { noLogin: true },
    component: () => import('../views/login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: { noLogin: true },
    component: () => import('../views/register.vue'),
  },
  {
    path: '/todo',
    name: 'Todo',
    component: (resolve) => require([`../views/todo.vue`], resolve),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 优先验证组件是否允许未登录状态访问
  // 通过 to.meta.noLogin 验证是否允许未登录状态下，访问
  // 一般情况下，只有登录页允许未登录访问
  if (to.meta.noLogin) {
    next();

    return;
  }

  // // 其次验证登录信息是否合法
  // // 非法情况下，记录当前路由地址，并跳转登录页
  // // 在登录成功后，跳转 referrer，并清除 referrer
  // if (!user.isLogIn()) {
  //   kindo.referrer = to.path === '/' ? undefined : to.path

  //   user.redirectLogin()

  //   return
  // }

  // // 其次验证是否完成了路由渲染
  // // 未渲染情况下, 重新渲染, 并重定向
  // // 【页面刷新时】
  // // 因所有用户数据都存储在 session storage 中, 因此页面刷新不会影响登录
  // // 但 vue router 会丢失, 全局变量也会丢失
  // // 因此, 通过 kindo.hasRenderRoutes 验证是否完成了路由渲染
  // if (!kindo.hasRenderRoutes) {
  //   // 此处的传递参数 router 对象
  //   // 是因为当页面刷新时
  //   // router 优先于 app.vue 执行
  //   // 导致 kindo.$router 为 undefined
  //   // 详情请见 renderRouter 的方法注解
  //   user.renderDictionary()
  //   user.renderRouter(router)

  //   next({ ...to })

  //   return
  // }

  // 正常情况, 直接跳转
  next();
});

export default router;
