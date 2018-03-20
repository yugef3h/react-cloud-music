<template>
  <div class="backlogin">
    <div class="login_box">
      <div class="title">后台登录</div>
      <div>
        <input class="myinput" type="text" placeholder="手机号/用户名" v-model="username" />
      </div>
      <div>
        <input @keyup.13="login" class="myinput" type="password" placeholder="口令" v-model="password" />
      </div>
      <div class="login_other">
        <a href="javascript:;">找回密码</a>
        <input type="checkbox" id="remenberme" /><label for="remenberme">记住我</label>
      </div>
      <button :disabled="disablebtn" class="login" @click="login">{{loginText}}</button>
      <div class="login_other _other">
        <router-link to="/">返回主页</router-link>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'login',
    data () {
      return {
        username:"admin",
        password:"123456",
        disablebtn:false,
        loginText:"登录"
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
        var _this = this;
        this.disablebtn = true;
        this.loginText = "登录中...";
        //this.$reqs就访问到了main.js中绑定的axios
        //后台接口
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


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
      float: left;
      color: #727f8f;
    }

    input{
      margin: 1px 5px 0 0;
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
  .title{
    color: #273444;
    font-size: 1.5em;
    text-align: center;
    margin: 0 0 20px 0;
  }
/*手机*/
  @media only screen and (max-width: 768px) {
    .login_box{
      width: 280px;
      margin: 50px auto;
    }
  }
</style>
