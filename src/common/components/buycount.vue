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
        data(){
            return{
                count:1
            }
        },
        methods:{
            //加
            plus(){
               this.count++;
               this.sendMsg(this.count);
            },
            //减
            minus(){
                if(this.count>1){
                    this.count--;
                    this.sendMsg(this.count);
                }

            },
            //发送数据
            sendMsg(data){
                this.$emit("count",data)
            }
        }
    }
</script>
