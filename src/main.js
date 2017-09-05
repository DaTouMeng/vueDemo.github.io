import Vue from 'vue'
import App from './App.vue'
//引入mint-ui
import  mint from 'mint-ui'
Vue.use(mint);
import '../node_modules/mint-ui/lib/style.css'
//创建路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//node 找模块 核心模块->node_modules->自定义.js .json .node
//引入自定义时间过滤器
import datefilter from './common/filter/datefilter.js'
Vue.use(datefilter);
//vue的http 请求
import  resource from 'vue-resource'
Vue.use(resource);
//图片预览
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
import  home from './component/home/home.vue'
import  goods from './component/goods/goods.vue'
import  goodsinfo from './component/goods/goodsinfo.vue'
import  shoppingcar from './component/shoppingcar/shoppingcar.vue'
import  settings from './component/settings/settings.vue'
import  news from './component/news/news.vue'
import  newsinfo from './component/news/newsinfo.vue'
import  photolist from './component/photo/photolist.vue'
import  photoinfo from './component/photo/photoinfo.vue'



//引入 mui样式
import './static/css/mui.min.css'
//引入全局样式
import './static/css/main.css'
//创建路由表
let router=new VueRouter({
    //路由切换以后的样式
    linkActiveClass:"mui-active",
    //路由
   routes:[
       //首页
       {path:'/home',component:home},
       //商品列表
       {path:'/goods',component:goods},
       //商品详细
       {path:'/goodsinfo/:id',component:goodsinfo},
       //购物车
       {path:'/shoppingcar',component:shoppingcar},
       //设置
       {path:'/settings',component:settings},
       //新闻路由
       {path:'/news',component:news},
       //新闻详情
       {path:'/newsinfo/:id',component:newsinfo},
       //图片列表
       {path:'/photolist/',component:photolist},
       //图片详情
       {path:'/photoinfo/:id',component:photoinfo}
   ]
});


new Vue({
    el:'#view',
    router:router,
    render:function(created){
        return created(App)
    }
});