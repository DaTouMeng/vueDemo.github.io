<template>
    <div id="content">
        <div id="desc">
            <!--图片详细-->
            <div class="title">
                <h4>{{imgInfo.title}}</h4>
                <p>
                    {{imgInfo.add_time|datefilter}} {{imgInfo.click}}次浏览
                </p>
                <!--分割线-->
                <p class="line"></p>
            </div>
            <!--图片缩略图-->
            <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9">
                    <li v-for="(item,index) in imgList"   :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <!--<img :src="item.src" alt="">-->
                        <!--图片预览功能-->
                        <!--图片预览功能需要有宽高-->
                        <img class="preview-img"  :src="item.src"  @click="$preview.open(index, imgList)">
                    </li>

                </ul>
            </div>
            <!--图片说明-->
            <p v-html="imgInfo.content"></p>
        </div>
        <comments v-bind="{artid:id,commentslist:commentslist}"></comments>
    </div>
</template>
<style scoped>
    /*图片详情样式*/
    #desc{
        padding: 10px;
    }
    #desc  .title h4{
        color: #0094ff;
    }

    #desc .title p{
        color:rgba(0,0,0,0.4);
        margin-top: 10px;
    }

    #desc .title .line{
        width: 100%;
        height: 1px;
        border-bottom: 1px solid rgba(0,0,0,0.4);
    }
    /* 9宫格的样式*/
    .mui-content,.mui-content ul{
        background-color: #fff;
    }

    .mui-grid-view.mui-grid-9{
        border-top:0px;
        border-left:0px;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right:0px;
        border-bottom:0px;
    }
    /* 9宫格缩略图的样式*/
    .mui-content img{
        width: 100px;
        height: 100px;
    }
</style>
<script>
    import { Toast } from 'mint-ui';
    import api from '../../common/api/api.js'
    //引用公共评论组件
        import comments from '../../common/components/comments.vue'
        export default{
            components:{
                comments,
            },
        data(){
            return{
                id:0,
                imgList:[],
                imgInfo:{}
            }
        },
        methods:{
            //获取图片缩略图
            getthumimages(){
                //获取url地址
                let url=`${api.apidomain}/api/getthumimages/${this.id}`;
                //获取图片列表数据
                this.$http.get(url)
                    .then(function (data) {
                        //判断状态
                        if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                            return;
                        }
                        //正常数据
                        //this.imgList=data.body.message;

                            //遍历data.body.message给每个图片对象添加w、h
                       this.imgList= data.body.message.map(item=>{
                            item.w=400;
                            item.h=400;
                            return item;
                        })
                    })
            },
            //获取图片详情
            getimageInfo(){
                //获取url地址
                let url=`${api.apidomain}/api/getimageInfo/${this.id}`;
                //获取图片列表数据
                this.$http.get(url)
                    .then(function (data) {
                        //判断状态
                        if(data.body.status!=0){
                            Toast('数据异常请联系管理员');
                            return;
                        }
                        //正常数据
                        this.imgInfo=data.body.message[0];
                    })
            }
        },
        created(){
            //获取id
            this.id=this.$route.params.id;
            //根据id发送数据请求
            this.getthumimages();
            this.getimageInfo();
        }
    }
</script>
