<template>
    <div id="content">
        <!--轮播图-->
        <swiper :list="swipeItemList" ></swiper>
        <!--商品详细信息-->
        <div id="buy">
            <h4>{{goodsInfo.title}}</h4>
            <ul>
                <li class="price">
                    市场价: <s>￥{{goodsInfo.market_price}}</s>   现价: <span>￥{{goodsInfo.sell_price}}</span>
                </li>
                <li class="inputli">
                    购买数量： <buycount @count="getbuycount"></buycount>
                </li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button @click="gotoShoppingCar" type="danger">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <!--商品图文介绍-->

    </div>
</template>
<style scoped>
    #buy,#params
    {
        margin: 5px;
        padding: 5px;
        border:1px solid rgba(0,0,0,0.4);
        border-radius: 5px;
    }
    .line{
        height: 1px;
        border: 1px solid rgba(0,0,0,0.2);
    }
    #buy ul,#params ul{
        padding-left: 0px;
    }
    #buy h4{
        color:#0094ff;
        padding: 5px;
    }
    #buy li,#params li{
        list-style: none;
        padding: 8px;
    }

    #buy .price span{
        color:red;
    }
    #other .imgdesc{
        margin-bottom: 20px;
    }
    .inputli{
        position: relative;
    }
    .countbutton{
        position: absolute;
        left:100px;
        top:5px;
    }
</style>
<script>
    import hubVue from '../../common/api/hubVue.js'
    import { Toast } from 'mint-ui';
    import api from '../../common/api/api.js'
    import swiper from '../../common/components/swiper.vue'
    import buycount from '../../common/components/buycount.vue'
    import {setItem}  from '../../common/api/localStorageService.js'
    export default{
        components:{
            swiper,buycount
        },
        data(){
            return{
                id:0,
                swipeItemList:[],
                goodsInfo:{},
                goodsDesc:{},
                count:0
            }
        },
        methods:{
            gotoShoppingCar(){
                //要保留购买数据存放在localstorage
                setItem({id:this.id,cou:this.count})
                //跳转到购物车页面
                hubVue.$emit('count',this.count);
                this.$router.push({path:'/shoppingcar'})
            },
            getbuycount(data){
                //保留子组件中的count参数到父组件中来
                this.count=data;
                //console.log('这是在goodsinfo中接收的数据',data);
            },
            //获取商品轮播图
            getswiper:function () {
                //获取图片的url 地址
                let url=`${api.apidomain}/api/getthumimages/${this.id}`;
                this.$http.get(url)
                    .then((data)=>{
                        this.swipeItemList=data.body.message;
                        //console.log(data);
                    })
            },
            //获取商品图文介绍
            getdesc:function () {
                //获取图片的url 地址
                let url=`${api.apidomain}/api/goods/getdesc/${this.id}`;
                this.$http.get(url)
                    .then((data)=>{
                        //一旦有数据就会更新swipeItemList
                        this.goodsDesc=data.body.message[0];
                        //console.log(data);
                    })
            },
            //获取商品详细
            getgoodsInfo:function () {
                //获取图片的url 地址
                let url=`${api.apidomain}/api/goods/getinfo/${this.id}`;
                this.$http.get(url)
                    .then((data)=>{
                        //一旦有数据就会更新swipeItemList
                        console.log(data.body);
                        this.goodsInfo=data.body.message[0];
                    })
            }
        },
        created(){
            //获取到id
           this.id=this.$route.params.id;
            //初始化阶段调用轮播图
            this.getswiper();
            //获取商品图文信息
            this.getdesc();
            //获取商品详细信息
            this.getgoodsInfo();
        }
    }
</script>
