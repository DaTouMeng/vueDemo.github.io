/**
 * Created by j on 2017/7/24.
 */
//key
export const key='goodslist';

//{id:,count}
//保存单条数据
export function setItem(data) {
    //获取localStorage
    let list=JSON.parse(localStorage.getItem(key)||'[]');
    //将当前数据插入到localStorage
    if(list.length>0){
        //判断是否存在这条数据
        let _index=-1;
       let status=list.some((item,index)=>{
           _index=index
          return  item.id==data.id
        });
        if(status){
           //有这条数据
            list[_index].count+=data.count
        }else{
            //没有这条数据
            list.push(data)
        }
    }else{
        list.push(data)
    }
    //debugger;
    //将list数据保存
    localStorage.setItem(key,JSON.stringify(list))
}

//获取数据
export function getItem(){
    //将数据获取过来直接转发出去
    return JSON.parse(localStorage.getItem(key)||'[]');
}
//获取所有数据id
export  function getItemId() {
    //获取全部数据
    let list=getItem();
    let itemIdList=[];
    list.forEach(item=>{
        //获取数组中每一项元素的id
        itemIdList.push(item.id)
    });
    return itemIdList.join(',')
}
//保存所有数据
export function setAllItem(list) {
   // debugger
    //保存列表数据到localstorage
    localStorage.setItem(key,JSON.stringify(list))

}