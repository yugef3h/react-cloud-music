<template>
  <div>
    <div class="login_box">
      <router-link to="/home"  class="navbar-brand"></router-link>
      <div id="login-module" v-show="lt2">
        <div>
          <input class="myinput" type="text" placeholder="手机号/用户名" v-model="username" />
        </div>
        <div>
          <input @keyup.13="login" class="myinput" type="password" placeholder="口令" v-model="password" />
        </div>
        <div class="login_other">
          <a href="javascript:">找回密码&nbsp;&nbsp;<i class="fa fa-angle-double-right"></i></a>
          <input type="checkbox" id="remenberme" /><label for="remenberme">记住我</label>
        </div>
        <button :disabled="disablebtn" class="login" @click="login">{{loginText}}</button>
        <div class="login_other _other" @click="lt2 = !lt2">
          <a href="javascript:">立即注册&nbsp;&nbsp;<i class="fa fa-angle-double-right"></i></a>
        </div>
      </div>
      <div id="reg-module"  v-show="!lt2">
        <div class="input_wrap">
          <span class="label">*用户名：</span>
          <input value="" autofocus="true" myReg="^[a-zA-z][0-9a-zA-z]{4,}$" class="myinput" type="text" placeholder="用户名"/>
          <span class="tips">至少5位字母或数字(英文字母开始)</span>
        </div>
        <!--<div class="input_wrap">
          <span class="label">*邮箱：</span>
          <input value="" myReg="^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$" class="myinput" type="text" placeholder="邮箱" />
          <span class="tips">请输入正确的邮箱地址</span>
        </div>-->
        <div class="input_wrap">
          <span class="label">手机号：</span>
          <input class="myinput" type="text" placeholder="手机号"/>
        </div>
        <div class="input_wrap">
          <span class="label">*密码：</span>
          <input value="" myReg="^[0-9_a-zA-z]{6,}$" class="myinput pwd" type="password" placeholder="密码"/>
          <span class="tips">只能6位以上字母数字或下划线</span>
        </div>
        <div class="input_wrap">
          <span class="label">*确认密码：</span>
          <input value="" class="myinput confirmPwd" type="password" placeholder="确认密码"/>
          <span class="tips">两次密码输入一致</span>
        </div>
        <div class="errTip">
          ~错误提示~
        </div>
        <div class="successTip">
          注册成功，<a href="login.html">点击登录</a> ，请即时去邮箱验证
        </div>
        <div class="login_other">
          <input type="checkbox" id="agreeAgr" checked="checked"/>
          <label for="agreeAgr">我已阅读并接受</label>
          <a style="float: none;" href="#" target="_blank">《用户协议》</a>
        </div>

        <button class="login" onclick="doRegister()" disabled="disabled">注册</button>

        <div class="login_other" style="margin-top: 10px;" @click="lt2 = !lt2">
          <a href="javascript:">有账号，去登录&nbsp;&nbsp;<i class="fa fa-angle-double-right"></i></a>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

  export default {
    name: 'login',
    data () {
      return {
        username:"admin",
        password:"123456",
        disablebtn:false,
        loginText:"登录",
        lt2: true
      }
    },
    methods:{
      login(){
        /*if (this.token) {
          this.$store.commit(types.LOGIN, this.token)
          let redirect = decodeURIComponent(this.$route.query.redirect || '/');
          this.$router.push({
            path: redirect
          })
        }*/
        let _this = this;
        this.disablebtn = true;
        this.loginText = "登录中...";
        //this.$reqs就访问到了main.js中绑定的axios
        //后台接口post方法"/users/login"
        this.$reqs.post("/users/login",{
          username:this.username,
          password:this.password
        }).then(res => {
          //console.log('res->前台1.1:');
          //console.log(res);
          //成功
          if(res.data.token){
            //存token
            localStorage.token=res.data.token;
            _this.$router.push({path:'/backStage/indexContent'});
          }
          _this.disablebtn = false;
          _this.loginText = "登录";

        }).catch(error => {
          //失败
          _this.disablebtn = false;
          _this.loginText = "登录"
          console.log(error);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*
  * Module section login
  */

  .login_box{
    width: 320px;
    margin: 50px auto;

    .myinput{
      width: 100%;
      border: 1px solid #cad3de;
      height: 40px;
      line-height: 40px;
      margin: 5px 0 10px;
      border-radius: 3px;
      padding: 0 10px;
      outline: none;
      box-sizing: border-box;
    }

    .myinput:focus{
      border: 1px solid #4289dc;
    }

    .login{
      box-sizing: border-box;
      border: none 0;
      height: 44px;
      line-height: 44px;
      width: 100%;
      background:#4187db;
      font-size: 16px;
      border-radius: 3px;
      margin-right: 40px;
      transition: all 0.5s ease;
      cursor: pointer;
      outline: none;
      color: #fff;
      margin-top: 15px;
    }
  }


  .login_other{
    overflow: hidden;

    a{
      float: right;
      color: #727f8f;
    }

    a:hover{
      color: #273444;
    }

    input, label{
      color: #727f8f;

    }

    input[type=checkbox]{
      vertical-align:middle;
      margin: -2px 4px 1px 0;
      cursor: pointer;
      outline: 0;
    }
  }





  ._other{
    margin-top: 10px;
  }

  .login:hover{
    background: #2668b5;
  }
  .login[disabled]{
    opacity: 0.8;
  }
  .login[disabled]:hover{
    background:#4187db;
  }

  @media only screen and (max-width: 768px) {
    .login_box{
      width: 280px;
      margin: 50px auto;
    }
  }

  .navbar-brand {
    height: 58px;
    width: 167px;
    background: url(/static/img/vrlogof.svg) no-repeat 0 0;
    background-size: cover;
    display: block;
    margin: 25px auto;
  }





  /*
  * Module section register
  */

  .login_box {
    width: 320px;
    margin: 50px auto;
  }

  .login_box .myinput {
    width: 100%;
    border: 1px solid #cad3de;
    height: 40px;
    line-height: 40px;
    margin: 5px 0 10px;
    border-radius: 3px;
    padding: 0 10px;
    outline: none;
    box-sizing: border-box;
  }

  .login_box .myinput:focus {
    border: 1px solid #4289dc;
  }



  .login {
    box-sizing: border-box;
    border: none 0;
    height: 44px;
    line-height: 44px;
    width: 100%;
    background: #4187db;
    font-size: 16px;
    border-radius: 3px;
    margin-right: 40px;
    transition: all 0.5s ease;
    cursor: pointer;
    outline: none;
    color: #fff;
    margin-top: 15px;
  }

  .login[disabled] {
    cursor: default;
  }

  .login:hover {
    background: #2668b5;
  }

  .login[disabled] {
    opacity: 0.7;
  }

  .login[disabled]:hover {
    background: #4187db;
  }

  .title {
    color: #273444;
    font-size: 1.5em;
    text-align: center;
    margin: 0 0 20px 0;
  }

  .input_wrap {
    position: relative;
  }

  .input_wrap .label {
    position: absolute;
    width: 77px;
    left: -90px;
    top: 15px;
    text-align: right;
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease;
  }

  .input_wrap .tips {
    display: block;
    color: #d9534f;
    position: relative;
    top: -2px;
    height: 0;
    overflow: hidden;
    transition: all 0.5s ease;
  }

  .input_wrap_focus .label {
    opacity: 1;
    visibility: visible;
    left: -80px;
  }

  .input_wrap_err .myinput {
    border-color: #d9534f !important;
  }

  .input_wrap_err .tips {
    height: 18px;
    margin-bottom: 5px;
  }
  .errTip, .successTip {
    border-left: 3px solid #d9534f;
    background: #f2dede;
    color: #d9534f;
    height: 0;
    overflow: hidden;
    transition: all 0.5s ease;
  }

  .successTip {
    border-left: 3px solid #468847;
    background: #dff0d8;
    color: #468847;
  }

  .successTip a {
    border-bottom: 1px solid #468847;
    color: #468847;
    margin-left: 5px;
  }

  .errTip.show, .successTip.show {
    height: 18px;
    padding: 5px 0 5px 10px;
    margin: 0 0 10px 0;
  }

  @media only screen and (max-width: 768px) {
    .login_box {
      width: 280px;
      margin: 50px auto;
    }
  }
</style>
