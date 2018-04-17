import Vue from 'vue'
import Router from 'vue-router'
const Index = r => require.ensure([], () => r(require('@/components/Index.vue')), 'groupfront1')
const Home = r => require.ensure([], () => r(require('@/components/Home.vue')), 'groupfront1')
const Articles = r => require.ensure([], () => r(require('@/components/Articles.vue')), 'groupfront2')
const Novel = r => require.ensure([], () => r(require('@/components/Novel.vue')), 'groupfront2')
const ArtDetails = r => require.ensure([], () => r(require('@/components/ArtDetails.vue')), 'groupfront3')
const Login = r => require.ensure([], () => r(require('@/components/Login.vue')), 'groupback1')
const BackStage = r => require.ensure([], () => r(require('@/components/BackStage.vue')), 'groupback2')
const IndexContent = r => require.ensure([], () => r(require('@/components/stage/IndexContent.vue')), 'groupback2')
const Essay = r => require.ensure([], () => r(require('@/components/stage/Essay.vue')), 'groupback3')
const ArticleList = r => require.ensure([], () => r(require('@/components/stage/ArticleList.vue')), 'groupback3')
const AdminList = r => require.ensure([], () => r(require('@/components/stage/AdminList.vue')), 'groupback2')



Vue.use(Router)

const router = new Router({
  mode: 'history',
  saveScrollPosition: true,

  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/articles',
          name: 'articles',
          component: Articles
        },
          {
            path: '/novel',
            name: 'novel',
            component: Novel,

          },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/:jump/:random/yuge:id.html',
          name: 'contents',
          component: ArtDetails,
        }
      ]
    },
    {
      path: '/backStage',
      name: 'backStage',
      meta: {
        requireAuth: true// 添加该字段，表示进入这个路由是需要登录的
      },
      component: BackStage,
      children: [
        {
          path: '/backStage/indexContent',
          name: 'indexContent',
          component: IndexContent
        },
        {
          path: '/backStage/adminList',
          name: 'adminList',
          component: AdminList
        },
        {
          path: '/backStage/articleList',
          name: 'articleList',
          component: ArticleList
        },
        {
          path:'/backStage/essay',
          name:'essay',
          component:Essay
        }
      ]
    }
  ]
})
// 页面刷新时，重新赋值token

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  let token = window.localStorage.token
  if (to.matched.some(r => r.meta.requireAuth)&&(!token || token===null)) {// 判断是否需要登录权限
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  } else {
    next()
  }
})
export default router
