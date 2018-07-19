import  Vue from 'vue'
import Router from 'vue-router'
const Index = r => require.ensure([], () => r(require('@/components/Index.vue')), 'groupfront1')
const Home = r => require.ensure([], () => r(require('@/components/frontEnds/Home.vue')), 'groupfront1')
const Articles = r => require.ensure([], () => r(require('@/components/frontEnds/Articles.vue')), 'groupfront2')
const Novel = r => require.ensure([], () => r(require('@/components/frontEnds/Novel.vue')), 'groupfront2')
const Reader = r => require.ensure([], () => r(require('@/components/frontEnds/Reader.vue')), 'groupfront2')
const ArtDetails = r => require.ensure([], () => r(require('@/components/frontEnds/ArtDetails.vue')), 'groupfront3')

const Login = r => require.ensure([], () => r(require('@/components/backStage/Login.vue')), 'groupback1')
const BackIndex = r => require.ensure([], () => r(require('@/components/backStage/Index.vue')), 'groupback2')
const IndexContent = r => require.ensure([], () => r(require('@/components/backStage/IndexContent.vue')), 'groupback2')
const Essay = r => require.ensure([], () => r(require('@/components/backStage/Essay.vue')), 'groupback3')
const ArticleList = r => require.ensure([], () => r(require('@/components/backStage/ArticleList.vue')), 'groupback3')
const AdminList = r => require.ensure([], () => r(require('@/components/backStage/AdminList.vue')), 'groupback2')
const BackHome = r => require.ensure([], () => r(require('@/components/backStage/Home.vue')), 'groupback2')

const BlogCate = r => require.ensure([], () => r(require('@/components/backblog/BlogCate.vue')), 'backblog')
const BlogManage = r => require.ensure([], () => r(require('@/components/backblog/BlogManage.vue')), 'backblog')
const BlogComment = r => require.ensure([], () => r(require('@/components/backblog/BlogComment.vue')), 'backblog')

const Settings = r => require.ensure([], () => r(require('@/components/backsys/Settings.vue')), 'backsys')
const UserList = r => require.ensure([], () => r(require('@/components/backsys/UserList.vue')), 'backsys')
const Personal = r => require.ensure([], () => r(require('@/components/backsys/Personal.vue')), 'backsys')

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
      path:'/:jump/:random/yuge:crawler',
      name:'reader',
      component: Reader
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
      path: '/index',
      name: 'backindex',
      meta: {
        requireAuth: true// 添加该字段，表示进入这个路由是需要登录的
      },
      redirect: '/index/home',
      component: BackIndex,
      children: [
        // {
        //   path: '/backStage/indexContent',
        //   name: 'indexContent',
        //   component: IndexContent
        // },
        // {
        //   path: '/backStage/adminList',
        //   name: 'adminList',
        //   component: AdminList
        // },
        // {
        //   path: '/backStage/articleList',
        //   name: 'articleList',
        //   component: ArticleList
        // },
        // {
        //   path:'/backStage/essay',
        //   name:'essay',
        //   component:Essay
        // },
        {
          path: '/index/home',
          name: 'backhome',
          component: BackHome
        },
        {
          path: '/index/blog/blogcate',
          name: 'blog-cate',
          component: BlogCate
        },
        {
          path: '/index/blog/blogmanage',
          name: 'blog-manage',
          component: BlogManage
        },

        {
          path: '/index/sys/settings',
          name: 'settings',
          component: Settings
        },
        {
          path: '/index/sys/userlist',
          name: 'userlist',
          component: UserList
        },
        {
          path: '/index/sys/personal',
          name: 'personal',
          component: Personal
        },
        {
          path: '/index/blog/blogcomment',
          name: 'comment',
          component: BlogComment
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
