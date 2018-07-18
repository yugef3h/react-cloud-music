<template>
  <div id="login">
    <div class="login-page">
      <div class="login-container">

        <div class="col-sm-6">

          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" id="login"
                  class="login-form">

            <div class="login-header">
              <a href="/home" class="logo">
                <span class="white">YGBLOG</span>
                <span>log in</span>
              </a>

              <p>Dear user, log in to access the admin area!</p>
            </div>


            <div class="form-group">
              <el-form-item label="UserName" prop="user">
                <el-input v-model.number="ruleForm.user" class="" placeholder="UserName"></el-input>
              </el-form-item>
            </div>
            <div class="form-group">
              <el-form-item label="Password" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" auto-complete="off"  class=""  placeholder="Password"></el-input>
              </el-form-item>
            </div>






            <div class="form-group">
              <el-button @click="submitForm('ruleForm')" style="font-size: 13px;">
                <i class="el-icon-circle-check-outline"></i>
                &nbsp;{{loginText}}
              </el-button>
            </div>

            <div class="login-footer">
						  <a href="#">Forgot your password?</a>
						
					  </div>


          </el-form>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    let checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please enter your username"));
      }
      callback();
      // 条件判断
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error('条件1不符'));
      //   } else {
      //     if (value < 18) {
      //       callback(new Error('条件2不符'));
      //     } else {
      //       callback();
      //     }
      //   }
      // }, 1000);
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "admin",
        pass: "123456"
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        user: [{ validator: checkUser, trigger: "blur" }]
      },
      //disablebtn:false,
      loginText:"Log In",
      //lt2: true
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.loginText = "Be Logging In...";
      this.$refs[formName].validate(valid => {
        if (valid) {
          let user = this.ruleForm.user;
          let pass = this.ruleForm.pass;
          //this.$router.push({ path: "/index" });
          this.login(user, pass);
        } else {
          console.log("empty submit!!");
          _this.loginText = "Log In"
          return false;
        }
      });
    },
    login (user, pass) {
          this.$reqs.post("/users/login",{
          username: user,
          password: pass
        }).then(res => {
          //console.log(res);
          if(res.data.token){
            //存token
            localStorage.token=res.data.token;
            this.$router.push({path:'/index/home'});
          }
          //_this.disablebtn = false;
          this.loginText = "Log In";

        }).catch(error => {
          //_this.disablebtn = false;
          this.loginText = "Log In"
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
#login {
  background-color: #2c2e2f;
  height: 100vh;
  margin: 0;
  position: relative;
}

.login-container {
  text-align: left;
  max-width: 960px;
  margin: 0 auto;
}

.col-sm-6 {
  width: 50%;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
}

.login-form {
  position: relative;
  padding: 30px;
  margin-bottom: 20px;
}

/* login-header */
.login-page .login-form .login-header {
  margin: 150px 0 40px;
}

a,
input {
  outline: none !important;
  text-decoration: none;
  color: white;
}

.logo span {
  color: rgba(151, 152, 152, 0.6);
  font-size: 15px;
}

.logo .white {
  color: white;
  font-size: 20px;
}

.login-header p {
  color: #979898;
  font-size: 13px;
}

/*  */
.form-group {
  position: relative;
  margin-bottom: 20px;
  font-size: 13px;
  color: #979898;
}

.form-group .control-label {
  display: inline-block;
  line-height: 40px;
  position: absolute;
  left: 0;
  top: 2px;
  right: 0;
  bottom: 0;
  padding: 0 13px;
  cursor: text;
  transition: all 220ms ease-in-out;
}

.form-group .form-control {
  height: 40px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  padding: 0 12px;
  transition: all 220ms ease-in-out;
  border-color: inherit;
  border-radius: 0;
}

.form-control.input-dark {
  background-color: #313334;
  border: 1px solid transparent;
  color: #fff;
}

/* submit */
.el-button {
  display: block;
  width: 100%;
  line-height: inherit;
  padding: 11px 12px;
  outline: none;
  border: 1px solid transparent;
  text-align: left;
}

.el-input__inner .form-control {
  background-color: #2c2e2f;
}

.form-group .el-button {
  border-color: rgba(55, 57, 58, 0.9);
  background-color: #2c2e2f;
  color: #fff;
}

.form-group .el-button:hover {
  background-color: #313334;
}

.el-form-item {
  position: relative;
}

.login-footer a {
  color: #979898;
  font-size: 13px;
}
</style>