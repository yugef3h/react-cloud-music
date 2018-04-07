<template>
  <div>
    <div class="single">
      <div class="wrap clearfix">
        <!--左边文章详情-->
        <article class="fl single-article">
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


          <!-- 作者简介开始 -->
          <div class="article-about-author">
            <img alt="yuge" src="/static/img/5.jpg" class="avatar avatar-96 photo" height="96" width="96">        <h2>作者专栏：Yuge</h2>
            <!-- 作者名字 -->
            <p>一名前端爱好开发者，欢迎我们成为朋友！</p>
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
        <!--右边统计-->
        <div class="mobile-hide aside-fr fr">
          <aside class="new-article single-page">
            <div class="aside-comment">
              <div class="aside-header margin-top-10 clearfix">
                <h3 class="fl cur on">最新文章</h3>
                <h3 class="fl cur">阅读量最高</h3>
              </div>
              <!-- 显示10篇最新更新文章 -->
              <div class="aside-tab-wrap">
                <ul class="list-article-title">
                  <li v-for="(tis,index) in tits"  :key="index">
                    <router-link :to="{name:'contents',params:{jump:'articles',random:Math.floor(Math.random()*199301),id:tis.id}}"
                      @click.native="getArtDet"
                    >
                      {{tis.title}}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
          <!-- 网站统计 -->
          <aside class="count">
            <div class="aside-conment">
              <div class="aside-header">
                <h3>网站统计</h3>
              </div>
              <ul class="count-wrap clearfix">
                <li class="fl count-list">
                  文章：10篇        </li>
                <li class="fr count-list">
                  评论：6条        </li>
                <li class="fl count-list">
                  分类：5个        </li>
                <li class="fr count-list">
                  标签：50个        </li>
                <li class="fl count-list">
                  页面：3个        </li>
                <li class="fr count-list">
                  最后更新：2018-01-14        </li>
              </ul>
            </div>
          </aside>
        </div>
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
        var url_c = '/users/'+this.$route.params.jump+'/'+this.$route.params.id+'.html'
        //console.log(url_c)
        this.$reqs.get(url_c).then(res => {
          //console.log(res);
          this.det_cont = res.data.data[0];
        }).catch(err => {
          console.log(err);
        })
      },
      getTitle(){
        var _this = this;
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
    padding: 0 15px 50px;
  /*被迫改白色或者固定死大导航*/
    background: #f1f1f1;

    .wrap {
      max-width: 1180px;
      margin: 20px auto;

      .fl {
        float: left;
      }

      article {
        box-sizing: border-box;
        width: 70%;
        padding: 10px 15px;
        border-radius: 10px;
        box-shadow: 1px 1px 5px #bdbdbd;
        background: #fff;
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


  .fr {
    float: right;
  }
  .new-article.on {
    position: fixed;
    top: 100px;
    width: 260px;
  }
  /*侧边统计*/
  .aside-fr {
    position: relative;
    width: 27%;
  }

  aside {
    margin-bottom: 30px;
    padding: 8px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 1px 1px 5px #bdbdbd;

    .list-article-title li:nth-child(1) a {
      color: #f74257;
    }

    .list-article-title li:nth-child(2) a {
      color: #17a6e8;
    }

    .list-article-title li:nth-child(3) a {
      color: #ed9248;
    }

    .list-article-title li:nth-child(1) a:before {
      border-color: #f74257;
      color: #f74257;
    }

    .list-article-title li:nth-child(2) a:before {
      border-color: #17a6e8;
      color: #17a6e8;
    }

    .list-article-title li:nth-child(3) a:before {
      border-color: #ed9248;
      color: #ed9248;
    }
  }

  .new-article.on {
    position: fixed;
    top: 100px;
    width: 260px;
  }



  /*aside 烦！*/
  aside .aside-comment {
    width: 100%;
  }

  aside .aside-comment li {
    width: 100%;
    margin-top: 10px;
  }

  aside .aside-header {
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    text-indent: 16px;
  }

  aside .aside-header h3.on{
    color: #17a6e8;
  }
  aside ul li a{
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100%;
  }

  aside ul li .iconfont {
    color: #ccc;
  }

  aside .list-article-title {
    counter-reset: count 0;
    width: 100%;
  }

  aside .list-article-title li a:before {
    content: counter( count);
    counter-increment: count 1;
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    line-height: 25px;
    text-align: center;
  }




  aside.count{
    height:100px;
  }
  aside.count .count-list.fl,aside.count .count-list.fr {
    width: 50%;
    line-height: 22px;
  }
  .cur {
    cursor: pointer;
  }
  @media screen and (max-width: 1050px){
    .single .wrap article{
      width: 100%;
    }
    .aside-fr{
      display: none;
    }
  }


  /*作者专栏*/
  .article-about-author{
    margin: 20px 0;
  }
  .article-about-author>img {
    float: left;
    width: 90px;
    height: 90px;
    margin-right: 10px;
  }
  .article-about-author p:last-of-type {
    margin-top: 10px;
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
</style>
