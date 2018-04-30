<template>
  <div>
    <!--课程列表-->
    <article class="article-header">最新文章</article>
    <article class="article-list"  v-for="(item,index) in info" :key="index">
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
    name:'home',
    data () {
      return {
        urlarr1:['image75543.jpg','image28970.jpg','image53939.jpg'],
        urlarr2:['g07.jpg','courseimg06.jpg','image28970.jpg'],
        imghurl:'/static/img/',
        info:[]
      }
    },
    mounted () {
      this.getArticles()
    },
    methods:{
      getArticles () {
        let _this=this;//保险：this 重新赋值给promise 成功的结果 _this.info，回过头思考：.vue模块作用域内data数据就是箭头函数的this数据啊...
        //    post   /users/article
        _this.$reqs.post('/users/article',{
          rows:3
        }).then(res => {
          console.log(res.data.data)
          _this.info = res.data.data
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
<style>

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
