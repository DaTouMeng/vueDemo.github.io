<template>
    <div id="content">
        <div class="mui-card" v-for="goods in goodsList" :key="goods.id">
            <div class="mui-card-header mui-card-media" v-bind="{style:`height:90vw;background-image:url(${goods.img_url})`}"></div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>现价：{{goods.sell_price}}   市场价 {{goods.market_price}}</p>
                    <p style="color: #333;">{{goods.title}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <router-link v-bind="{to:`/goodsinfo/${goods.id}`}" class="mui-card-link">查看商品</router-link>
                <a class="mui-card-link">加入购物车</a>
            </div>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import api from '../../common/api/api.js'
    export default{
        data(){
            return {
//                商品数据
                goodsList:[]
            }
        },
        methods:{
            getGoodsList(pageindex=1){
                //获取商品列表
                //获取url地址
                let url=`${api.apidomain}/api/getgoods/?pageindex=${pageindex}`;
                //获取图片列表数据
                this.$http.get(url)
                    .then(function (data) {
                        //判断状态
                        if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                            return;
                        }
                        //获取到商品数据
                        this.goodsList=data.body.message

                    })
            }

        },
        created(){
            this.getGoodsList();
        }
    }
</script>
<style scoped>
    .mui-content li{
        border: 1px solid rgba(0,0,0,0.4);
        -webkit-box-shadow: 0 0 4px #000;
        -moz-box-shadow: 0 0 4px #000 ;
        box-shadow: 0 0 4px #000 ;
        margin-left: 4px;
        padding: 5px;
    }

    .mui-content .mui-media-body{
        color: #0094ff;
    }

    .mui-content .desc{
        height: 60px;
        background-color: rgba(0,0,0,0.1);
        margin-top: 10px;
        padding: 5px;
        text-align: left;
    }
    .mui-content .desc span{
        color: red;
        margin-right: 15px;
    }
    .mui-content a{
        padding-left: 0px;
        margin-left: 0px;
    }

    .mui-content .desc .right{
        position: absolute;
        right: 10px;
        bottom: 0px;
    }

    .mui-content .desc .left{
        position: absolute;
        left: 10px;
        bottom: 0px;
    }
</style>