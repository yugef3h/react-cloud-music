<template>
  <div>
    <!--课程列表-->
    <div class="main">
      <div class="one_block">
        <div class="title">
          <img src="/static/img/titleimg01.jpg" alt="分区图标">
          <span>// 01</span><span> Basic</span>
          <h1>置顶</h1>
        </div>
        <ul class="list">
          <li v-for="(item,index) in info" :key="index">
            <router-link  :to="{name:'contents',params:{jump:'articles',random:Math.floor(Math.random()*199301),id:item.id}}">
              <div>
                <img class="lazy" :src="imghurl+urlarr1[index]" :data-original="imghurl+urlarr1[index]" alt="随机图标">
              </div>
              <h4>{{item.title}}</h4>
              <div class="text">
                <em>{{item.author}}</em>
                <i class="fa fa-eye" aria-hidden="true"></i>
                <span>{{item.see}}查看</span>
                <i class="fa fa-heart" aria-hidden="true"></i>
                <span>{{item.chart}}喜欢</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="one_block">
        <div class="title">
          <img src="/static/img/titleimg02.jpg" alt="分区图标">
          <span>// 02</span><span> Advance</span>
          <h1>文章随笔</h1>
        </div>
        <ul class="list">
          <li v-for="(item,index) in info"  :key="index">
            <router-link  :to="{name:'contents',params:{jump:'articles',random:Math.floor(Math.random()*199301),id:item.id}}">
              <div><img class="lazy" :src="imghurl+urlarr2[index]" :data-original="imghurl+urlarr2[index]" alt="数据库随机图标"></div>
              <h4>{{item.title}}</h4>
              <div class="text">
                <em>{{item.author}}</em>
                <i class="fa fa-eye" aria-hidden="true"></i>
                <span>{{item.see}}查看</span>
                <i class="fa fa-heart" aria-hidden="true"></i>
                <span>{{item.chart}}喜欢</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="one_block">
        <div class="title upda">
          <img src="/static/img/titleimg03.jpg" alt="分区图标">
          <span>// 03</span><span> Going on</span>
          <h1>持续更新中 . . </h1>
        </div>
      </div>
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
        var _this=this;
        //    post   /users/article
        _this.$reqs.post('/users/article',{
          rows:3
        }).then(res => {
          _this.info = res.data.data
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    padding-top: 10px;
    position: relative;
    background: #fff;

    .one_block {
      overflow: hidden;
    }
  }

  .main .title {
    padding-top: 80px;
    border-bottom: 1px solid #979fa8;
    padding-bottom: 30px;
    width: 400px;
    margin: 0 auto;
    color: #979fa8;

    img {
      width: 66px;
      float: left;
      margin-right: 18px;
    }

    h1 {
      color: #32475f;
      font-size: 32px;
      font-weight: normal;
      display: block;
      -webkit-margin-before: 0.35em;
    }
  }

  .upda{
    border: none;
    padding-bottom:120px;
  }



  .list .text i {
    margin: 0 5px 0 10px;
  }
  .list {
    padding-top: 36px;
    width: 100%;
    margin: 0 auto;
    padding-left: 4%;
    padding-right: 1%;
    overflow: hidden;

    li {
      width: 30%;
      margin: 0 1% 2% 1%;
      transition: all 0.3s ease;
      border-radius: 6px;
      overflow: hidden;
      background: #f5f6f8;
      padding-bottom: 15px;
      cursor: pointer;
      float: left;
      display: list-item;
      text-align: -webkit-match-parent;

      h4 {
        font-weight: normal;
        font-size: 18px;
        height: 50px;
        line-height: 1.5em;
        color: #32475f;
        padding: 5px 10px;
        overflow: hidden;
        margin-bottom: 10px;
      }
    }

    li:hover {
      box-shadow: 0 2px 40px rgba(13,62,73,0.2);
      transform: translateY(-3px);
    }
  }

  /*以下层级复杂不放*/
  .list img {
    width: 100%;
    max-width: 100%;
    display: inline;
  }

  .list .text span, .list .text i {
    color: #979fa8;
    font-size: 12px;
  }
  .list .text em {
    float: right;
    margin-right: 15px;
    font-style: normal;
    color: #4187db;
  }
  /*大屏幕*/
  @media only screen and (min-width: 1200px) {
    .list{
      width: 1200px;
    }
  }
  @media only screen and (max-width: 992px){
    .list {
      padding-left: 2%;
      padding-right: 2%;
    }
  }
  /*手机*/
  @media only screen and (max-width: 768px) {
    .list li{
      width: 90%;
      margin:0 2% 4% 2%;
      float: left;
    }
    .list{
      padding-left: 3%;
      padding-right: 3%;
    }
    .main .title{
      padding-left: 20px;
    }
    #header .btns button{
      margin: 10px 20px;
    }

  }

</style>
