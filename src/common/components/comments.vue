<template>
    <div>
        <!--评论列表-->
        <ul class="mui-table-view">
            <li v-for="item in commentList" class="mui-table-view-cell">
                <p>评论时间：{{item.add_time|datefilter}}</p>
                <p>评论用户：{{item.user_name}}</p>
                <p>评论内容: {{item.content}}</p>
            </li>
        </ul>
    </div>
</template>
<style scoped>
</style>
<script>
    //在当前组件中创建评论组件
    import api from '../../common/api/api.js'
    import { Toast } from 'mint-ui'
    export default{
        //如果属性是由外部传递过来的时候需要使用props接受
        //在使用过props中的属性不要再往data中添加同名属性
        props:["artid"],
        //data是处理当前组件的属性
        data(){
            return{
                commentList:[]
            }
        },
        methods:{
            //es6可以给方法添加默认值
            getcomments(pageindex=1){
                // console.log(pageindex);
                //url地址
                //http://182.254.146.100:8899/api/getcomments/13?pageindex=2
                let url=`${api.apidomain}/api/getcomments/${this.artid}?pageindex=${pageindex}`;

                //获取评论数据
                this.$http.get(url)
                    .then(data=>{
                        //判断数据是否异常
                        if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                            return;
                        }
                        //判断数据是否返回成功
                        //获取news新闻
                        this.commentList=this.commentList.concat(data.body.message);
                    },error=>{
                        //数据返回失败
                        Toast('数据异常请联系管理员');
                        //如果是公司还会有个异常数据提交的api
                    })
            },
        },
        created(){
            //一进入就要获取评论数据
            this.getcomments();
        }
    }
</script>
