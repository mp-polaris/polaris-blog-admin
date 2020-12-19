import Vue from 'vue'
import App from './App.vue'
import router from './router'
/*饿了么的UI*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import leftMenu from './layout/left-menu';
import topHeader from './layout/top-header';
import constants from './utils/constants';

// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
//
// Vue.use(mavonEditor);

Vue.config.productionTip = false;
// Vue.prototype.blog_constant = constants;

Vue.component('leftMenu', leftMenu);
Vue.component('topHeader', topHeader);
Vue.use(ElementUI);
import {checkToken, success_code} from './api/api';

router.beforeEach((to, from, next) => {
  //如果是登录界面，则需要放行
  if (to.path === '/login') {
    //如果要做得更好一点，如果用户要跳转到登录页面
    //当前已经登录了，则没必要再到登录界面了，除非用户点击退出登录
    //如果已经登录，根据角色判断页面跳转。
    next();
  } else {
    //否则检查用户角色
    checkToken().then(result => {
      if (result.code === success_code) {
        window.localStorage.setItem('avatar', result.data.avatar);
        window.localStorage.setItem('userName', result.data.userName);
        //成功，判断用户角色
        //如果是管理员，放行
        //如果是普通用户，跳转到门户首页
        if (result.data.roles === 'role_admin') {
          next();
        } else {
          location.href = constants.portalBaseUrl;
        }
      } else {
        //跳转到登录界面
        next({
          path: '/login'
        })
      }

    });
  }
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
