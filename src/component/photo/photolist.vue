<template>
    <div id="content">
       <!--<p v-for="item in photoList">{{item.title}}</p>-->
        <ul class="mui-table-view">
            <li  v-for="item in photoList" :key="item.id"   class="mui-table-view-cell mui-media">
                <router-link v-bind="{to:'/photoinfo/'+item.id}" class="">
                    <!--<img class="mui-media-object mui-pull-right" :src="item.img_url">-->
                    <img class="mui-media-object mui-pull-right" v-lazy="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class="mui-ellipsis" v-html="item.content"> </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<style scoped>
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>
<script>
    import { Toast } from 'mint-ui';
    import api from '../../common/api/api.js'
    export default{
        data(){
            return{
                photoList:[]
            }
        },
        methods:{
            getphotolist(){
                //获取url地址
                let url=`${api.apidomain}/api/getimages/0`;
                //获取图片列表数据
                this.$http.get(url)
                    .then(function (data) {
                        //判断状态
                        if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                            return;
                        }
                        //正常数据
                       this.photoList=data.body.message;
                    })
            }
        },
        created(){
            //组件创建初期调用方法
            this.getphotolist();
        }
    }
</script>
