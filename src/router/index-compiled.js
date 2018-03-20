import Vue from 'vue';
import Router from 'vue-router';
var Index = function Index(r) {
  return require.ensure([], function () {
    return r(require('@/components/Index.vue'));
  }, 'groupfront1');
};
var Home = function Home(r) {
  return require.ensure([], function () {
    return r(require('@/components/Home.vue'));
  }, 'groupfront1');
};
var Articles = function Articles(r) {
  return require.ensure([], function () {
    return r(require('@/components/Articles.vue'));
  }, 'groupfront2');
};
var Case = function Case(r) {
  return require.ensure([], function () {
    return r(require('@/components/Case.vue'));
  }, 'groupfront2');
};
var AboutMe = function AboutMe(r) {
  return require.ensure([], function () {
    return r(require('@/components/AboutMe.vue'));
  }, 'groupfront2');
};
var ArtDetails = function ArtDetails(r) {
  return require.ensure([], function () {
    return r(require('@/components/ArtDetails.vue'));
  }, 'groupfront3');
};
var Login = function Login(r) {
  return require.ensure([], function () {
    return r(require('@/components/Login.vue'));
  }, 'groupback1');
};
var BackStage = function BackStage(r) {
  return require.ensure([], function () {
    return r(require('@/components/BackStage.vue'));
  }, 'groupback2');
};
var IndexContent = function IndexContent(r) {
  return require.ensure([], function () {
    return r(require('@/components/stage/IndexContent.vue'));
  }, 'groupback2');
};
var Essay = function Essay(r) {
  return require.ensure([], function () {
    return r(require('@/components/stage/Essay.vue'));
  }, 'groupback3');
};
var ArticleList = function ArticleList(r) {
  return require.ensure([], function () {
    return r(require('@/components/stage/ArticleList.vue'));
  }, 'groupback3');
};
var AdminList = function AdminList(r) {
  return require.ensure([], function () {
    return r(require('@/components/stage/AdminList.vue'));
  }, 'groupback2');
};

Vue.use(Router);

var router = new Router({
  //mode: 'history',
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/home',
    children: [{
      path: '/articles',
      name: 'articles',
      component: Articles
    }, {
      path: '/cases',
      name: 'cases',
      component: Case
    }, {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/aboutMe',
      name: 'aboutMe',
      component: AboutMe
    }, {
      path: '/:jump/:random/yuge:id.html',
      name: 'contents',
      component: ArtDetails
    }]
  }, {
    path: '/backStage',
    name: 'backStage',
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    component: BackStage,
    children: [{
      path: '/backStage/indexContent',
      name: 'indexContent',
      component: IndexContent
    }, {
      path: '/backStage/adminList',
      name: 'adminList',
      component: AdminList
    }, {
      path: '/backStage/articleList',
      name: 'articleList',
      component: ArticleList
    }, {
      path: '/backStage/essay',
      name: 'essay',
      component: Essay
    }]
  }]
});
// 页面刷新时，重新赋值token

//  判断是否需要登录权限 以及是否登录
router.beforeEach(function (to, from, next) {
  var token = window.localStorage.token;
  if (to.matched.some(function (r) {
    return r.meta.requireAuth;
  }) && (!token || token === null)) {
    // 判断是否需要登录权限
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});
export default router;

//# sourceMappingURL=index-compiled.js.map