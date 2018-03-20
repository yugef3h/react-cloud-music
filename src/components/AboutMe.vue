<template>

  <div class="wrap_w">
    <div class="content">
      <div class="clearfix navkind">
        <span class="blue_block l"></span>
        个人简介
      </div>
      <div class="article_con">
        <div class="message">
          <p>姓名：俞庆龙</p>
          <p>QQ：245868066</p>
          <p>博客：<a href=""></a></p>
          <p>Github 部分项目及 Demo：<a href="https://github.com/yugef3h">https://github.com/yugef3h</a></p>
        </div>
        <br>
        <div class="titleOne">
          <p class="cont_aph">
            懂设计，热爱编程，喜欢研究一切有关前端方面的<br/>新鲜事物但并不局限于前端。</p>
          <p class="cont_skills">JavaScript
            &nbsp;&nbsp;&nbsp;&nbsp;jQuery&nbsp;&nbsp;&nbsp;&nbsp;HTML5
            &nbsp;&nbsp;&nbsp;&nbsp;CSS3&nbsp;&nbsp;&nbsp;&nbsp;ES6
            &nbsp;&nbsp;&nbsp;&nbsp;Sass<br/>Gulp
            &nbsp;&nbsp;&nbsp;&nbsp;Git&nbsp;&nbsp;&nbsp;&nbsp;Vue
            &nbsp;&nbsp;&nbsp;&nbsp;Mysql&nbsp;&nbsp;&nbsp;&nbsp;MongoDB
            &nbsp;&nbsp;&nbsp;&nbsp;Nodejs&nbsp;&nbsp;&nbsp;&nbsp;Vuejs
            &nbsp;&nbsp;&nbsp;&nbsp;Webpack<br/>Nginx
            &nbsp;&nbsp;&nbsp;&nbsp;响应式等
          </p>
        </div>
        <br>
        <div class="titleTwo">
          <p class="cont_sch">
            福州大学
          </p>
          <p class="cont_sch2">
            至诚学院 电子信息工程
          </p>
        </div>
      </div>
      &lt;!&ndash;其他&ndash;&gt;
      <div class="clearfix navkind">
        <span class="blue_block l"></span>
        百度收录
      </div>
      <div class="clearfix navkind">
        <img src="/static/img/024.jpg" alt="补充说明">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  $line-height:25px;
  .wrap_w {
    background-color: #fff;
    max-width:1200px;
    margin:0 auto;

    .content {
      margin: 0 auto;

      .navkind {
        color: #333;
        padding: 20px 0 5px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        text-align: left;
        text-indent: 15px;
        font-weight: 700;

      }
      .clearfix:after {
        content: "";
        width: 100%;
        height: 0;
        display: block;
        clear: both;
      }
    }
  }

  .content>.navkind{
  /*图片响应式*/
    img{
      max-width:100%;
      height:auto;
      display: block;
    }

    .blue_block {
      width: 5px;
      height: 20px;
      background-color: #007aff;
    }
    .l {
      float: left;
    }
  }

  .article_con .message p,.article_con .titleOne p,.article_con .titleTwo p {
    line-height:$line-height;
  }

  .cont_skills, .cont_skills2 {
    margin-top: 10px;
  }
  .titleOne{
    .cont_aph {
      color: #5499a6;
    }

    .cont_skills {
      color: #333;
    }
  }
  .titleTwo{
    .cont_sch {
      color: #5499a6;
      font-weight: bold
    }

    .cont_sch2 {
      color: #5499a6;
    }
  }



  @media only screen and (max-width:1023px) {
    .wrap_w{
      width:98%;
    }
    .content{
      width:98%;
      margin:0 auto;
    }
  }

</style>
