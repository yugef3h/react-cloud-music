<template>
  <div class="adminList main">
    <div class="input_box">
      <input class="myinput hide_art" type="text"/>
      <button class="btn btn_art" @click="ToEssay()"><i class="fa fa-plus"></i>添加新随笔</button>
    </div>
    <!-- 缺少一个编辑修改-->
    <grid
      :listData="listData"
      :theadData="theadData"
      :ifEdit="true"
      :ifDelete="true"
      :ifpage="true"
      :pageInfo="pageInfo"
      @on-delete="deleteArticle"
      @on-gopage="gopage"
    ></grid>
  </div>
</template>

<script type="text/ecmascript-6">
  var theadData = [
    {
      title:"标题",
      keyname:"title"
    },{
      title:"创建时间",
      keyname:"CreateTime"
    }
  ];
  import grid from '../vmods/grid.vue'
  export default {
    name: 'adminList',
    data () {
      return {
        listData:[],
        theadData:theadData,
        Admin:{ //用户信息
          name:"",
          phone:"",
          password:"",
        },
        editAdminObj:null,  //用于存放正在编辑的用户
        pageInfo:{}
      }
    },
    mounted:function(){
      //获取文章列表
      this.getArticleList(1);
    },
    methods:{
      //获取文章列表
      getArticleList(page){
        var _this = this;
        this.$reqs.post('/users/article',{
          page:page,
          rows:5
        }).then(result =>{
          //成功
          //console.log(result.data.total[0].count)
          //console.log(result);
          _this.listData = result.data.data;
          _this.pageInfo.allpage = Math.ceil( result.data.total[0].count/5 );
        }).catch(error => {
          //失败
          console.log(error)
        });
      },
      deleteArticle(item){// 删除文章
        //console.log(item)
        this.$reqs.post('/users/delete_a',item)
          .then((result)=>{
            //成功
            this.gopage(this.pageInfo.current);
          }).catch(error => {
          //失败
          console.log(error)
        });
      },
      gopage(index){
        this.pageInfo.current = index;
        //查询数据
        this.getArticleList(index)
      },
      ToEssay () {
        this.$router.push({path:'/backStage/essay'});
      }
    },
    components:{
      grid
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main{
    border-radius: 4px;
    background: #fff;
    margin-top: 10px;

    .input_box{
      padding: 0 10px;

      .hide_art{
        width: 0;
        border:none;
      }
    }
  }

  .btn_art{
    margin-left:-20px;
  }
</style>
