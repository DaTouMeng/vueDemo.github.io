<template>
    <div id="content">
        <ul v-for="news in newsList.message" class="mui-table-view">
            <li class="mui-table-view-cell mui-media">
                <!--<router-link to="{{'/newsinfo/'+news.id}}" class="">-->
                <router-link v-bind="{to:'/newsinfo/'+news.id}" class="">
                    <img class="mui-media-object mui-pull-left" :src="news.img_url">
                    <div class="mui-media-body">
                        {{news.title}}
                        <p class="mui-ellipsis">{{news.zhaiyao}}</p>
                        <div>
                            <span>时间:{{news.add_time|datefilter}}</span>
                            <span>点击:{{news.click}}</span>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<style scoped>
</style>
<script>
    import { Toast } from 'mint-ui';
    import api from '../../common/api/api.js'

//    let now = moment().format('LLLL');
    export default{
        data(){
            return{
                text:'news新闻',
                newsList:{
                    "status": 0,
                    "message": [
                        {
                            "id": 13,
                            "title": "1季度多家房企利润跌幅超50% 去库存促销战打响",
                            "add_time": "2015-04-16T03:50:28.000Z",
                            "zhaiyao": "房企一季度销售业绩已经陆续公布，克而瑞研究中心统计",
                            "click": 1,
                            "img_url": "http://182.254.146.100:8080/upload/201504/16/201504161149414479.jpg"
                        },
                        {
                            "id": 14,
                            "title": "买房还是炒股，2015年买房无法拒绝的5大理由",
                            "add_time": "2015-04-16T04:05:34.000Z",
                            "zhaiyao": "转眼间2015年已经过去了4个月，在这短短的四个月",
                            "click": 2,
                            "img_url": "http://182.254.146.100:8080/upload/201504/16/201504161205596364.jpg"
                        },
                    ]
                }
            }
        },
        methods:{
            //箭头函数在使用过程中需要考虑this的指向问题
            //在做提交 如果是未上线版本 做完一个功能提交一个功能
            //在做提交 上线版本 需要将整个功能都完成才可以提交

            getnews:function (){
                //console.log(this);
                //新闻url  开发http://182.254.146.100:8899
                // 测试http://182.254.146.100:7788
                // 上线   http://www.itcast.com/api/getnewslist
                let url=`${api.apidomain}/api/getnewslist`;
                this.$http.get(url)
                    .then(data=>{
                        //判断数据是否异常
                        if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                            return;
                        }
                        //判断数据是否返回成功
                        //获取news新闻
                        this.newsList=data.body;
                    },error=>{
                        //数据返回失败
                            Toast('数据异常请联系管理员');
                            //如果是公司还会有个异常数据提交的api
                    })
            },

        },
        created(){
            //一进来就请求新闻数据
            this.getnews();
        }

    }
</script>
