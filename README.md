# 图片列表思路

- 1.添加跳转url
- 2.根据跳转url创建对应路由和组件
- 3.创建获取图片列表的方法
- 4.在组件创建的初期获` 根据获取图片列表的方法`拿到图片列表数据


# 图片懒加载(Lazy load)
- 用没有看到的图片不去做加载，通过监视用的滚动条，如果快要到底部的时候再去让后面的图片加载过来
- img的特性是一旦有src属性就会发送请求获取图片（script也有这个功能），
- 步骤
 + 1.（用户）懒加载在一开始的时候给每个图片添加的不是src属性（添加属性例如imgsrc），
 + 2.（懒加载工具）在监视用户滚动条如果开接近这张图片将imgsrc转换src属性，
 + 3. （浏览器）那这个图片一旦有了src属性就会去请求服务器获取该图片
- 优缺点
    + 优点：1.让用户更快看到页面 2.减少服务器的请求或者压力
    + 缺点： 需要使用懒加载的工具，将原有的src属性改成别的imgsrc属性
    
# vue中的懒加载 mint-ui(lazy load)
- 1.下载 mint-ui
- 2.引用mint-ui 
- 3. 在你需要懒加载的位置替换原有img中的src属性，换成v-lazy即可

# Vue集成PhotoSwipe图片预览插件
- 1.下载 `npm i vue-preview -S`
- 2. 引用 vue-previe
```javascript
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
```
- 3.使用方式参照npm中示例
```html
<!-- index是指索引，imgList你便利的数据-->
 <img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, imgList)">
```
- 4.每张图片需要有宽和高，对应的属性是w和h
- 5.在webpack.config.js中需要`url-loader` 添加对图片`svg|gif`处理
- 6.预览图在pc端和移动有些样式不同

# 封装常用功能将其转换成组件
- 在公司一开始的思想就是将所有的页面都通过组件化的思想进行封装
- 创建常用组件步骤
 + 1. 在你的功能代码区创建公共组件
 + 2.在你需要公共组件的位置调用公共组件
   ``` 
     //引入公共组件
      //引用公共评论组件
        import comments from '../../common/components/comments.vue'
        export default{
            components:{
            //表示当前组件需要使用其他组件
                comments,
            }
    ```
    ```html
     <!--从外部传递过来的属性-->
    <comments name="test" age="19"></comments>  
    ```
 + 3.公共组件中通过props获取从外部传递过来的属性
   ```
       {
       //通知当前组件使用props中的内容
          props:['name'，'age'],
         created(){
          //在props中的内容和data使用方式都是通过this使用
           console.log(this.name)
          }
       }
    ```
    
    