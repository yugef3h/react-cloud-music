<template>
  <div>
    <div class="single">
      <div class="wrap clearfix">
        <!--左边文章详情-->
        <article class="single-article">
          <div class="breadcrumbs">
            <span>当前位置：</span>
            <router-link to="/">首页</router-link> &gt; <router-link :to="{name:jump}">{{navpath()}}</router-link> &gt;  {{navtitle()}} </div>
          <div class="header">
            <h2>{{navtitle()}}</h2>
            {{navauthor() }}       <span>发布于</span>
            <time>{{det_cont.CreateTime}}</time>
            <i class="fa fa-comments">5</i>
            <i class="fa fa-fire">66</i>
          </div>
          <div class="content" v-html="jump==='articles'?det_cont.content:det_cont.Content"></div>



        </article>
        <article>
          <!-- 作者简介开始 -->
          <div class="article-about-author">
            <img alt="yuge" src="/static/img/5.jpg" class="avatar avatar-96 photo" height="96" width="96">
            <h3 class="gray">作者专栏：Yuge</h3>
            <!-- 作者名字 -->
            <p class="gray">一名前端爱好开发者，欢迎我们成为朋友！</p>
            <p class="share-btn">
              <a href="">
                <i class="fa fa-home"></i> 博客
              </a>
              <a href="http://wpa.qq.com/msgrd?v=3&uin=245868066&site=qq&menu=yes" target="_blank">
                <i class="fa fa-qq"></i> QQ
              </a>
              <a href="javascript:;">
                <i class="fa fa-wechat"></i> 微信
                <!--            <span class="wechat-num">
                              微信号：yxl93914              <img src="" width="100%" alt="微信">
                              <i class="iconfont icon-close1"></i>
                            </span>-->
              </a>
              <a href="">
                <i class="fa fa-calendar-o"></i> 留言
              </a>
            </p>
          </div>
          <!-- 作者简介结束 -->
        </article>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name:'contents',
    data () {
      return {
        det_cont:'',
        tits:[],
        jump:this.$route.params.jump,
        navpath () {
          return this.jump==="articles"?"笔记":"案例展示"
        },
        navtitle () {
          return this.jump==="articles"?this.det_cont.title:this.det_cont.CaseTitle
        },
        navauthor () {
          return this.jump==="articles"?this.det_cont.author:this.det_cont.Author
        }
      }
    },
    mounted () {
      this.getArtDet()
      this.getTitle()
    },
    methods: {
      getArtDet () {
        let url_c = '/users/'+this.$route.params.jump+'/'+this.$route.params.id+'.html';
        let _this = this;
        //console.log(url_c)
        this.$reqs.get(url_c).then(res => {
          //console.log(res);
          _this.det_cont = res.data.data[0];
        }).catch(err => {
          console.log(err);
        })
      },
      getTitle(){
        let _this = this;
        this.$reqs.post('/users/article', {
          rows: 8
        }).then(result => {
          //成功
          //console.log(result);
          _this.tits = result.data.data;
        }).catch(error => {
          console.log(error)
        });
      }
    },
  }
</script>
<style lang="scss" scoped>
  .single {
    overflow: hidden;
    min-height: 490px;

  /*被迫改白色或者固定死大导航*/
    /*background: #f1f1f1;*/

    .wrap {
      /*max-width: 1180px;*/
      margin: 25px auto;


      article {
        box-sizing: border-box;
        /*        width: 70%;*/
        padding: 10px 15px;
        border-radius: 10px 10px 0 0;
        border: 1px solid #d4d8eb;
        background: #fff;
      }
      article:last-child {
        border-radius: 0 0 10px 10px;
        border-top: transparent;
      }
    }
  }

  .clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }

  article{
    .header {
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      text-align: center;
    }

    .breadcrumbs {
      color: #b7b7b7;
    }

    .content{
      font-size:14px;
      line-height:2;
      margin:.4rem auto;
    }
  }

  /*a标签是大爷*/
  a:hover {
    color: #0cf;
  }
  a {
    text-decoration: none;
    color: #000;
    transition: .7s;
  }

  h2 {
    display: block;
    font-size: 1.5em;
    -webkit-margin-before: 0.83em;
    -webkit-margin-after: 0.83em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    font-weight: bold;
    margin: 10px 0;
  }






  /*作者专栏*/
  .article-about-author{
    margin: 4px 0 4px;
  }
  .article-about-author>img {
    float: left;
    width: 90px;
    height: 90px;
    margin-right: 10px;
    border-radius:10px;
  }
  .article-about-author p:last-of-type {
  }
  .article-about-author .share-btn a:nth-of-type(1) {
    background: #fc8bd2;
  }
  .article-about-author .share-btn a:nth-of-type(2) {
    background: #b663ff;
  }
  .article-about-author .share-btn a:nth-of-type(3) {
    position: relative;
    background: #4cc6fa;
  }
  .article-about-author .share-btn a:nth-of-type(4) {
    background: #49cc5b;
  }
  .article-about-author .share-btn a {
    display: inline-block;
    margin-top: 5px;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
  }
  .gray{
    color: #8a9399;
  }
</style>
