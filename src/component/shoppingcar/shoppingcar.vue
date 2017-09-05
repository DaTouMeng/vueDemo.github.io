<template>
    <div id="content">
        <!--购物车的列表-->
        <div class="row" v-for="(item,index) in goodsList" :key="item.id">
            <mt-switch v-model="item.status"></mt-switch>
            <img class="img"  :src="item.thumb_path" alt="">
            <div class="inforight">
                <h4>{{item.title}}</h4>
                <div class="bottom">
                    <ul>
                        <li>￥{{item.sell_price}}</li>
                        <li> <shoppingcount   :goodsid="item.id" @count="shoppingcount" :cou="item.cou"></shoppingcount> </li>
                        <li><a @click="delgoods(item)">删除</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!--购物车的结算-->
        <div id="total">
            <div class="desc">
                <ul>
                    <li>总计（不含运费）</li>
                    <li>已勾选商品：{{totalcount}}，总价{{totalPrice}} 元</li>
                </ul>
            </div>
        </div>
        <div id="button">
            <mt-button type="danger">去结算</mt-button>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import api from '../../common/api/api.js'
    import {getItemId,getItem,setAllItem}  from '../../common/api/localStorageService.js'
    import shoppingcount from '../../common/components/shoppingcount.vue'
    export default{
        components:{
            shoppingcount
        },
        //通过computed计算数据变化后的内容
        computed:{
            //计算总数量
            totalcount(){
                let goodsCount=0;
                let goodsPrice=0;
                //统计所有确认购买的商品
                this.goodsList.forEach(item=>{
                    //当认为购买的数据status 为true
                    if(item.status){
                        //统计数量
                        goodsCount+=item.cou;
                        //统计价格
                        goodsPrice+= parseFloat(item.cou)*parseFloat(item.sell_price);
                    }
                });
                //将统计好的价格赋值个totalPrice
                this.totalPrice=goodsPrice;
                //保存数据
                //console.log(this.goodsList);
               // setAllItem(this.goodsList);
                return goodsCount
            }
        },
        data(){
            return {
                goodsList:[],
                totalPrice:0
            }
        },
        methods:{
            delgoods(item){
                //获取下标
                let index=this.goodsList.indexOf(item);
                //根据下标删除数据
                this.goodsList.splice(index,1);
                //保存数据
                setAllItem(this.goodsList);
            },
            shoppingcount(data){
              //获取到子组件中的数量
                this.goodsList.forEach(item=>{
                    //如果id相同表示是同一个数据，需要更新数量
                    if(item.id==data.id){
                        item.cou=data.count;
                    }
                })
            },
            //发送请求获取购买商品信息
            getshopcarlist(ids){
                let url=`${api.apidomain}/api/goods/getshopcarlist/${ids}`;
                this.$http.get(url)
                    .then((data)=>{
                        //一旦有数据就会更新swipeItemList
                       //一旦有数据以后需要给每个goods添加 status,数量需要添加
                        //返回所有的购物车数据
                        let _shoppingcarlist=getItem();

                        console.log(_shoppingcarlist);
                        data.body.message.forEach(item=>{
                            item.status=true
                            //真实数据
                            _shoppingcarlist.forEach(_item=>{
                                if(item.id==_item.id){
                                    //将真实的数量赋值到页面数据来
                                    item.cou=_item.cou
                                }
                            })

                        });
                        this.goodsList=data.body.message;
                    })
            }
        },
        created(){
            //已进入这个组件就要获取localstorage中的数据的id
            let ids=getItemId();
            this.getshopcarlist(ids);
        }
    }
</script>
<style scoped>
    .row{
        border-bottom: 1px solid rgba(0,0,0,0.3);
        height: 102px;
        display: flex;
        padding: 5px;
    }

    .switch{
        flex:0 0 52px;
    }

    .img{
        margin-left: 5px;
        height: 75px;
        width: 75px;
        flex: 0 0 85px;
    }

    .inforight{
        margin-left: 5px;
        flex:1;
    }
    .inforight ul{
        padding-left: 0px;
    }
    .inforight li{
        list-style: none;
        display: inline-block;
    }

    .inforight h4{
        color: #0094ff;
        font-size: 14px;
    }

    .bottom li:first-child{
        color:red;
        margin-right: 5px;
    }

    .bottom li:last-child{
        margin-left: 5px;
    }
    #total{
        height: 100px;
        background-color: rgba(0,0,0,0.1);
        display: flex;
        padding: 5px;;
    }

    #total ul {
        padding-left: 0px;
    }
    #total li{
        list-style: none;
        font-size: 14px;
    }

    #button{
        flex:0 0 60px;
        margin: 30px 0 0 0 ;
    }

    .desc{

        flex:1;
    }
</style>