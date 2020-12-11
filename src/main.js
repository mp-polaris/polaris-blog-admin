import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import http from './api/http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import leftMenu from './layout/left-menu'
import topHeader from './layout/top-header'

Vue.use(ElementUI);
Vue.prototype.$http = http;
Vue.config.productionTip = false;
//全局组件
Vue.component('leftMenu',leftMenu);
Vue.component('topHeader',topHeader);

//导航守卫
router.beforeEach((to, from, next) => {
  console.log(to);
  //如果是登录界面，则需要放行
  if (to.path === '/login') {
    //如果要做得更好一点，如果用户要跳转到登录页面
    //当前已经登录了，则没必要再到登录界面了，除非用户点击退出登录
    //如果已经登录，根据角色判断页面跳转。
    next();
  } else {
    // //否则检查用户角色
    // checkToken().then(result => {
    //   console.log(result);
    //   if (result.code === success_code) {
    //     window.localStorage.setItem('avatar', result.data.avatar);
    //     window.localStorage.setItem('userName', result.data.userName);
    //     //成功，判断用户角色
    //     //如果是管理员，放行
    //     //如果是普通用户，跳转到门户首页
    //     if (result.data.roles === 'role_admin') {
    //       next();
    //     } else {
    //       location.href = this.blog_constant.portalBaseUrl;
    //     }
    //   } else {
    //     //跳转到登录界面
    //     next({
    //       path: '/login'
    //     })
    //   }
    //
    // });
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
