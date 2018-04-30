<template>
  <div class="backlogin">
    <!--头像区-->
    <div class="header">
      <div class="search_box" :class="{search_box_fouce:search_box_fouce}">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input @focus="focusFn" @blur="blurFn" type="text" name="" id="" value="" placeholder="搜索，暂未开放 . . . " />
      </div>
      <div class="handler">
        <div class="more" @click="toggleSlide">
          <i class="fa fa-bars" aria-hidden="true"></i>
          <ul :class="{showul:showExit}">
            <li><a href="javascript:;" @click="logout"><i class="fa fa-sign-out" aria-hidden="true"></i>退出</a></li>
            <li><a href="javascript:;" @click="toggleMid">修改密码</a></li>
            <li><a href="javascript:;">意见反馈</a></li>
          </ul>
        </div>
        <img src="/static/img/5.jpg" alt="header"/>
      </div>
    </div>
    <!--侧面导航-->
    <div class="sidenav_box">
      <img class="logo" src="/static/img/slogo.png" alt="" />
      <ul class="sidenav">
        <li class="now">
          <router-link to="/backStage/indexContent">
            <i class="fa fa-home" aria-hidden="true"></i>
            <span>首页</span>
          </router-link>
        </li>
        <li>
          <router-link to="/backStage/articleList">
            <i class="fa fa-book" aria-hidden="true"></i>
            <span>文章管理</span>
          </router-link>
        </li>
        <li>
          <router-link to="/backStage/adminList">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            <span>数据管理</span>
          </router-link>
        </li>
      </ul>
    </div>
    <!--路由内容-->
    <div class="content">

      <ul class="breadcrumb">
        <li>
          <router-link to="/backStage/indexContent">首页</router-link>
        </li>
        <li>{{pageTitle}}</li>
      </ul>
      <router-view></router-view>

    </div>
    <!--修改密码-->
    <div class="alert_pas" :class="{showcp:showalpass}">
        <div class="modal-body">
          <div>
            <div>
              <input type="password" placeholder="旧密码" v-model="alterpass.oldpass" class="myinput">
            </div>
            <div>
              <input type="password" placeholder="新密码" v-model="alterpass.newpass" class="myinput">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" @click="submitPas">确定</button>
          <button type="button" class="btn cancelbtn" @click="toggleMid">取消</button>
        </div>
      </div>
  </div>
</template>

<script>
  var pageTitleObj = {
    indexContent:"首页",
    adminList:"数据管理",
    articleList:"文章管理",
    essay:"添加随笔"
  };

  export default {
    name: 'backlogin',
    data () {
      return {
        search_box_fouce:false,
        alterpass:{
          token:localStorage.token,
          oldpass:'',
          newpass:''
        },
        showExit:false,
        showalpass:false,
        pageTitle: pageTitleObj[ this.$route.path.substr( this.$route.path.lastIndexOf("/")+1 ) ] || "网站首页"
      }
    },
    mounted () {
    },
    methods:{
      focusFn(){  //搜索框获取焦点，添加class
        this.search_box_fouce = true;
      },
      blurFn(){   //搜索框失去焦点，去掉class
        this.search_box_fouce = false;
      },
      toggleSlide(){ //这个是用来显示和隐藏头像旁的退出下拉框
        this.showExit = !this.showExit
      },
      toggleMid(){ //这个是用来显示和隐藏修改密码框架
        this.showalpass = !this.showalpass
      },
      logout(){ //退出系统
        localStorage.removeItem('token');
        this.$router.push({
          path: '/'
        })
      },
      submitPas () { // 修改密码提交
        let _this = this;
        //console.log(this.alterpass)
        this.$reqs.post('/users/alterpass',this.alterpass)
        .then(res => {
          _this.emptyAdmin()
          _this.showalpass = !this.showalpass
          alert('修改成功')
        }).catch(err => {
          console.log(err)
        })
      },
      emptyAdmin(){ //清空输入框
        this.alterpass.oldpass = "";
        this.alterpass.newpass = "";
      }
    },
    watch:{ //监控路径变化  当路径发送变化的时候，改变面包屑导航的显示
      $route: {
        handler: function (val, oldVal) {
          var path = val.path;
          this.pageTitle = pageTitleObj[ path.substr( path.lastIndexOf("/")+1 ) ] || "网站首页";
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /*头像区*/
  .header{
    height: 60px;
    box-shadow: 0 1px 5px rgba(13,62,73,0.2) ;
    background: #fff;
    margin-left: 80px;
    min-width: 740px;
  }
  /*侧导*/
  .sidenav_box{
    width: 80px;
    box-shadow: 0 1px 5px rgba(13,62,73,0.2) ;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    z-index: 99;

    .logo{
      width: 65px;
      margin: 10px 0 0 10px;
    }

    .sidenav{
      margin-top: 30px;

      .fa{
        color:#000
      }
    }
  }
  /*路由内容*/
  .content{
    margin: 20px 30px 0px 100px;
    min-height: 300px;
    min-width: 700px;

    .breadcrumb{
      border-radius: 4px;
      padding: 10px 15px;
      background: #fff;
    }
  }


  .sidenav li{
    margin-bottom: 20px;
  }
  /*vue自带*/
  .sidenav .router-link-active:after{
    content: "";
    position: absolute;
    left: -16px;
    top: 8px;
    height: 40px;
    width: 8px;
    border-radius: 3px;
    background: #566a80;
  }
  .sidenav .router-link-active{
    opacity: 1;
    background: #f0f2f5;
  }






  /*顶部栏*/
  .search_box{
    color: #979fa8;
    padding-top: 20px;
    float: left;

    input{
      border:none;
      outline: none;
    }
  }

  .search_box i{
    margin: 0 12px 0 70px;
    transition: all 0.5s ease;
  }

  .search_box_fouce i{
    margin-left: 55px;
    color: #2C3D50;
  }




  .handler > *{
    float: right;
    margin-right: 20px;
    cursor: pointer;
  }

  .handler{
    .more{
      font-size: 20px;
      color: #566A80;
      margin: 15px 30px 0 0;
      position: relative;
    }
    .more:hover{
      color: #2C3D50;
    }
  }

  .handler .more{
    ul{
      font-size: 14px;
      position: absolute;
      right: 0;
      top: 55px;
      width: 120px;
      box-shadow: 0 1px 5px rgba(13,62,73,0.2);
      transition: all 0.3s ease-out;
      height: 0;
      opacity: 0;
      overflow: hidden;
      text-align: center;
    }


    .showul{
      height: auto;
      top: 45px;
      opacity: 1;
      border-top: 1px solid #979FA8;
    }
    a{
      display: block;
      padding: 8px 10px;
      background: #fff;
      color: #566A80;
      text-decoration: none;
    }
    a:hover{
      background: #f8f9fb;
    }
  }

  .handler > img{
    width: 50px;
    border-radius: 50%;
    margin-top: 5px;
    margin-right: 30px;
  }

  .alert_pas{
    position:fixed;
    top: 0px;
    right:460px;
    height:0;
    opacity: 0;
    z-index:-1;
    background-color: #fff;
    box-shadow: 0 3px 9px rgba(0,0,0,.5);
    border-radius: 6px;
    border: 1px solid rgba(0,0,0,.2);


    .modal-body {
      position: relative;
      padding: 3px;
      .myinput{
        width:400px;
        height: 30px;
        line-height: 30px;
        margin: 7px 10px;
      }
    }
    .modal-footer {
      text-align: right;

      .btn{
        margin-top:2px;
        margin-right:15px;
        height:29px;
        padding-top:4px;
      }
      .cancelbtn{
        opacity:0.8;
      }
    }
  }
  .showcp{
    height: 140px;
    overflow:visible;
    width:430px;
    opacity: 1;
    z-index:99;
    border-top: 1px solid #979FA8;
    background: #fff;
  }

  /*content*/
  .breadcrumb > li{
    display: inline-block;
    color: #777777;
  }
  .breadcrumb > li+li:before{
    padding: 0 5px;
    color: #ccc;
    content: "/\00a0";
  }
  .breadcrumb > li > a{
    color: #32475f;
    text-decoration: none;
  }


  /*侧边nav待改造*/
  .sidenav a{
    display: block;
    width: 56px;
    height: 56px;
    margin: 0 auto;
    position: relative;
    cursor: pointer;
    opacity: 0.6;
    transition:all 0.5s ease;
    text-decoration: none;
  }
  .sidenav a i{
    font-size: 20px;
    line-height: 56px;
    text-align: center;
    display: block;
    color: #566a80;
  }
  .sidenav a:hover{
    background: #f0f2f5;
    opacity: 1;
  }
  .sidenav a span{
    position: absolute;
    left: 55px;
    top: 22px;
    background: #000;
    color: #fff;
    width: 0px;
    padding: 5px 0;
    border-radius: 3px;
    font-size: 12px;
    opacity: 0;
  }
  .sidenav a:hover span{
    opacity: 1;
    left: 65px;
    width: 60px;
    padding: 5px 20px;
    transition:none 0.5s ease-out;
    transition-property: opacity,left;
  }
  .sidenav a span:after{
    content: "";
    position: absolute;
    top: 8px;
    left: -10px;
    border:5px solid transparent;
    border-right-color: #000;
  }
</style>
