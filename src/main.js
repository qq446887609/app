// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'styles/iconfont.css'  /*引入reset.css*/
import 'styles/reset.css'  /*引入reset.css*/
import 'styles/border.css' /*引入border.css 解决1像素边框问题 */
import 'styles/common.css' /** 引入公用css */
import fastClick from 'fastclick'   /*引入 fastclick 库 解决 移动端 click 延迟300毫秒问题*/
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import vueSwiper from 'vue-awesome-swiper' //引入轮播图
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
import {getNewToken} from "./api/api.js"

Vue.use(vueSwiper);
Vue.use(iView);
Vue.use(axios);

Vue.config.productionTip = false
fastClick.attach(document.body) /*引入 fastclick 库 解决 移动端 click 延迟300毫秒问题*/
//Vue-router跳转页面时返回顶部
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});

//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});

// start 请求拦截器 //
axios.interceptors.request.use(
  config => {
   config.timeout = 2500
   let token = window.localStorage.getItem('user_token')

   //获得当前服务器是否为自己api服务器并且token存在加入token
   if (config.url.indexOf("julyapi")!=-1&&token) {
    config.headers = {
     'Authorization': "Bearer "+token,
    }
   }
   return config
  },
  error => {
   return Promise.reject(error)
  }
)
// end 请求拦截器 //

// start 回调拦截器 //
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
        switch (error.response.status) {
            //当返回401错误时 发起新的请求 刷新token
            case 401:
                let config = error.config;
                if(config.url.indexOf("julyapi")){
                    //判断是否已经刷新过token
                    if (!config.isRetryRequest) {
                      //重新获得token
                      return getNewToken()
                          .then(function (res) {
                              let data = res.data;
                              if(data.access_token!=""){
                                window.localStorage.setItem("user_token",data.access_token);
                                //修改flag
                                config.isRetryRequest = true;
                                //修改原请求的token
                                let token = window.localStorage.getItem('user_token');
                                config.headers.Authorization = `Bearer ` + token;

                                //这里需要把刷新的token返回给android客户端 todo 难点

                                //重新发起返回401的请求
                                return axios(config);
                              }
                          })
                          .catch(function () {
                            //刷新失败操作
                          });
                  }
                }
                break;
        }
    }
    else{
        //可以提示超时
    }
  }
)
// end 回调拦截器 //

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
