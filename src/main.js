//import js or css etc use allpages!

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

//ps:这里可以写自定义头
axios.defaults.withCredentials=true;  // 跨域保存session有用
axios.defaults.timeout = 5000;
axios.defaults.baseURL = "http://localhost:3000"; // 打包的时候直接删掉，默认基础路径在这里配置
// 将 axios 赋值给 Vue，方便在子组件里面使用
Vue.prototype.$reqs = axios;
Vue.config.productionTip = false

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    //if(store.state.token){
    //config.headers.Authorization = `token ${store.state.token}`;
    //}
    if(localStorage.getItem('token')){
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// 添加响应拦截器
axios.interceptors.response.use( res => {
    return res;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
