<template>
  <div class="wrap_w">
    <div class="content">
      <div class="clearfix navkind">
        <span class="blue_block l"></span>
        案例展示
      </div>
      <div class="article_con">
        <ul class="clearfix list">
          <li v-for="(item,index) in newest" class="l"  :key="index">
            <router-link :to="{name:'contents',params:{jump:'cases',random:Math.floor(Math.random()*199301),id:item.id}}">
              <div class="img_con">
                <img :src="imgUrl+item.CaseImg" width="259" height="178"/>
              </div>
              <h5 class="tit">{{item.CaseTitle}}</h5>
              <div class="clearfix text">
                <i class="fa fa-eye"  aria-hidden="true"></i><span>{{item.See}}</span>
                <i class="fa fa-thumbs-up"  aria-hidden="true"></i><span>{{item.Chart}}</span>
              </div>
              <div class="des">{{item.CaseDis}}...</div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="loading" v-if="loading">加载中...</div>
    </div>
  </div>
</template>
<script>
  //export default 之前可以对象字面量
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
      this.getCaseList(1);
    },
    methods: {
      getCaseList(page){
        var _this = this;
        this.$reqs.post('/users/case', {
          page: page,
          rows: 8
        }).then(result => {
          //console.log(result);
          _this.newest = result.data.data;
        }).catch(error => {
          console.log(error)
        });
      }
    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
      next();
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .wrap_w {
    background-color: #fff;
    min-height:600px;

    .content {
      width: 1200px;
      margin: 0 auto;
    }
  }

  .navkind {
    color: #333;
    padding: 20px 0 5px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    text-align: left;
    text-indent: 15px;
    font-size: 14px;
    font-weight: 700;

    .blue_block {
      /*display: inline-block;*/
      width: 5px;
      height: 20px;
      background-color: #007aff;
    }
    .l {
      float: left;
    }
  }

  .clearfix:after {
    content: "";
    width: 100%;
    height: 0;
    display: block;
    clear: both;
  }


  /*列表*/
  .article_con{
    margin: 20px 0 0;
    padding-bottom: 20px;
    border:1px solid #f8f8f8;
  }
  .article_con ul li{
    width: 299px;
    padding: 20px;
    box-sizing: border-box;
    transition: all 500ms;
    text-align: left;
    font-size: 16px;
    background-color: #fff;
    float:left;

    .tit{
      font-weight: normal;
      font-size: 18px;
      height: 20px;
      line-height: 1.5em;
      color: #32475f;
      padding: 5px 0;
      overflow: hidden;
      margin-bottom: 5px;


    }

    .img_con{
      height: 180px;
      overflow: hidden;

        img{
          max-width: 100%
        }
    }

    .des{
      font-size: 12px;
      line-height: 1.5em;
      color: #32475f;
      overflow: hidden;
    }

    .text{
      margin-bottom: 10px;

      i {
        margin: 0 5px 0 5px;
      }

      span, i {
        color: #979fa8;
        font-size: 12px;
      }
    }
  }

  .article_con ul li:hover{
    box-shadow: 0 0 10px #ccc;
    transform: translateY(-2px);
  }

  .loading {
    text-align: center;
    color: #999;
    font-size: 12px;
    padding: 20px;
  }

  @media only screen and (max-width: 1100px) {
    .content{
      padding-left: 2%;
      padding-right: 2%;
    }
    .list li{
      margin:0 100% 0 0;
      float: left;
    }
    .list{
      padding-left: 0.5%;
      padding-right: 0;
    }
  }




</style>
