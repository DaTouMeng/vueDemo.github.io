<template>
    <div id="content">
        <!--<h1>{{text}}</h1>-->
        <!--首页轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(imgData,key) in swipeItemList.message" :key="key">
                <img :src="imgData.img" alt="">
            </mt-swipe-item>

        </mt-swipe>
        <!--九宫格的设置-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link  to="/news">
                <span class="mui-icon mui-icon-home"></span>
                <div class="mui-media-body">新闻</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/photolist">
                <span class="mui-icon mui-icon-email">
                    <!--<span class="mui-badge">5</span>-->
                </span>
                <div class="mui-media-body">图片</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/goods">
                <span class="mui-icon mui-icon-chatbubble"></span>
                <div class="mui-media-body">商品</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-location"></span>
                <div class="mui-media-body">location</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-search"></span>
                <div class="mui-media-body">Search</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-phone"></span>
                <div class="mui-media-body">Phone</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-gear"></span>
                <div class="mui-media-body">Setting</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-info"></span>
                <div class="mui-media-body">about</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <span class="mui-icon mui-icon-more"></span>
                <div class="mui-media-body">more</div></a></li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                text:'首页',
                //轮播图
                swipeItemList:{}
            }
        },
        methods:{
            //获取轮播图
            getswiper:function () {
                //url 地址
                let url='http://182.254.146.100:8899/api/getlunbo';
                this.$http.get(url)
                    .then((data)=>{
                    //一旦有数据就会更新swipeItemList
                        this.swipeItemList=data.body
                        //console.log(data);
                    })
            }
        },
        //进入这个组件就会调用created
        //生命周期
        created(){
            //在home组件生命周期创建时请求轮播图
           // console.log('home组件被创建了');
            this.getswiper();
        }
    }
</script>
<style scoped>
    /* 轮播图*/
    .mint-swipe{
        height: 190px;
    }
    .mint-swipe-item img{
        width: 100%;
    }
    .mint-swipe-item{
        /*background-color: red ;*/
        width: 100%;
        height: 190px;
    }
    /*九宫格*/
    .mui-grid-view.mui-grid-9{
        background-color: white;
        border:0px

    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border:0px
    }
    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-search:before,
    .mui-icon-phone:before{
        content: '';
        display: inline-block;
        width: 50px;
        height: 50px;
        background-repeat: round;
    }

    .mui-icon-home:before{
        background-image: url(../../static/imgs/1.png);
    }

    .mui-icon-email:before{
        background-image: url(../../static/imgs/2.png);
    }
    .mui-icon-chatbubble:before{
        background-image: url(../../static/imgs/3.png);
    }
    .mui-icon-location:before{
        background-image: url(../../static/imgs/4.png);
    }
    .mui-icon-search:before{
        background-image: url(../../static/imgs/5.png);
    }
    .mui-icon-phone:before{
        background-image: url(../../static/imgs/6.png);
    }
</style>