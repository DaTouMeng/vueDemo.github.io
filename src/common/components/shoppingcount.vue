<template>
    <div id="subtmpl">
        <div class="inleft div"  @click="minus">-</div>
        <div class="incenter div">{{count}}</div>
        <div class="inright div" @click="plus">+</div>
    </div>
</template>
<style scoped>
    #subtmpl .div{
        width: 40px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #000;
        display: inline-block;
        text-align: center;
    }
</style>
<script>
    export default{
        props:[
            "cou","goodsid"
        ],
        data(){
            return{
                count:0
            }
        },
        methods:{
            //加
            plus(){
               this.count++;
               this.sendMsg({count:this.count,id:this.goodsid});
            },
            //减
            minus(){
                if(this.count>1){
                    this.count--;
                    this.sendMsg({count:this.count,id:this.goodsid});
                }

            },
            //发送数据
            sendMsg(data){
                this.$emit("count",data)
            }
        },
        created(){
            //vue不希望由父组件传过来的参数和子组件做双向数据绑定
            this.count=this.cou
        }
    }
</script>
