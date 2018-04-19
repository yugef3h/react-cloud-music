<template>
  <div>
    <!--课程列表-->
    <article class="article-header">当前频道: 文章</article>
    <article class="article-list"  v-for="(item,index) in newest" :key="index">
      <div class="tag">
        <a href="#" class="tag-a">标签1</a>
        <a href="#" class="tag-a">标签2</a>
        <a href="#" class="tag-a">标签3</a>
      </div>
      <router-link  :to="{name:'contents',params:{jump:'articles',random:Math.floor(Math.random()*199301),id:item.id}}">
        <h4 class="w4">{{item.title}}</h4>
      </router-link>
      <div class="summary" v-html="item.content"></div>
      <router-link  :to="{name:'contents',params:{jump:'articles',random:Math.floor(Math.random()*199301),id:item.id}}" class="c-blue">阅读详情&gt;&gt;</router-link>
      <div class="art-info">
        <div class="flex-1 flex-fl">
          <i class="fa fa-fw fa-user" aria-hidden="true"></i>
          <span>{{item.author}}</span>
        </div>
        <div class="flex-10">
          <i class="fa fa-fw fa-clock-o" aria-hidden="true"></i>
          <span>{{item.CreateTime}}</span>
        </div>
        <div class="flex-1 flex-fr">
          <i class="fa fa-fw fa-comments-o" aria-hidden="true"></i>
          <span>{{item.see}}</span>
        </div>



      </div>
    </article>
    <div class="article-list">
      <span>
        加载更多...
      </span>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'articles',
    data () {
      return {
        imgUrl:'/static/img/',
        newest:[],
        loading:true
      }
    },
    mounted() {
      this.getAdminList(1);
    },
    methods: {
      getAdminList(page){
        let _this = this;
        this.$reqs.post('/users/article', {
          page: page,
          rows: 8
        }).then(result => {
          console.log(result.data.data);
          _this.newest = result.data.data;
          //_this.pageInfo.allpage = Math.ceil(result.data.total / 5);
        }).catch(error => {
          console.log(error)
        });
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .article-list{
    background: #fff;
    margin: 25px auto;
    border-radius: 5px;
    padding:15px;
    border: solid 1px #f7f5fa;
  }

  .article-list:last-child{
    height:45px;
    width:130px;
    text-align: center;
    padding: 10px;
    background: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    color:#fff;
  }
  .article-header{
    background: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #4FBFFF 97%);
    padding:8px 15px;
    border-radius: 5px 5px 0 0;
    height:40px;
    margin:25px auto 0;
    border-bottom: 1px solid #fff;
    color:#fff;
  }
  .article-list:nth-child(2){
    border-radius: 0 0 5px 5px;
    margin: 0 auto 25px;
  }
  .article-list:hover {
    z-index: 2;
    box-shadow: 0px 0px 50px 15px rgba(238, 238, 238, 0.8);
  }
  .summary {
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    line-height: 2;
    height:120px;
  }
  .tag-a{
    background: #40BAF5;
    color:#fff;
    padding:1px 5px;
    font-size: 11px;
    line-height: 1.5;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .art-info {
    border-top: solid 1px #f7f5fa;
    display: flex;
    margin-top:15px;
    padding-top:10px;
  }
  .flex-1 {
    flex-grow:1;
  }
  .flex-10 {
    flex-grow:10;
  }
  .flex-fr{
    text-align: right;
  }
  .w4{
    word-wrap: break-word;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: bold;
    color: #000;
  }
  .c-blue {
    color:#40BAF5
  }
</style>
