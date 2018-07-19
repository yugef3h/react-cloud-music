<template>
  <div id="settings">
      <div class="panel">
      <div class="panel-heading">
        <el-row :gutter="20">
          <el-col :span="6"><div class="lf" style="font-size: 20px;">修改设置</div></el-col>
          <!-- <el-col :span="6" :offset="12">
            <div class="rg">
              <el-button class="btn-pink">新增<i class="el-icon-plus el-icon--right"></i></el-button>
            </div>
          </el-col> -->
        </el-row>
      </div>

      <div class="panel-body">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="" size="mini">
          <!-- <el-form-item label="公告栏" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item> -->
          <el-form-item label="公告栏:" prop="notice">
            <el-input type="textarea" v-model="ruleForm.notice"></el-input>
          </el-form-item>
          <el-form-item label="登录用户名:" prop="">
            <span class=infobox>超级管理员</span> 
            <a href="#" @click="show = !show">[修改登录用户名]</a>
          </el-form-item>

          <transition name="fade">
            <div v-if="show">
              <el-form-item label="新登录用户名:" prop="user">
                <el-input v-model="ruleForm.user"></el-input>
              </el-form-item>
            </div>
          </transition>


          <el-form-item label="密码:" prop="">
            <span class=infobox>********</span> 
            <a href="#"  @click="show1 = !show1">[修改密码]</a>
          </el-form-item>
          <transition name="fade">
            <div v-if="show1">
              <el-form-item label="旧密码:" prop="oldpass">
                <el-input type="password" v-model="ruleForm.oldpass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码:" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
              </el-form-item>
            </div>
          </transition>


          <el-form-item label="Email:" prop="">
            <span class=infobox>245868066@qq.com</span> 
            <a href="#"  @click="show2 = !show2">[修改Email]</a>
          </el-form-item>
          <transition name="fade">
            <div v-if="show2">
              <el-form-item label="账户密码:" prop="oldpass">
                <el-input type="password" v-model="ruleForm.oldpass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="新注册邮箱:" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
            </div>
          </transition>
          <!-- <el-form-item label="活动区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item> -->

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "settings",
    mounted:function(){

    },
    created:function(){
		
    },
     data() {
      //  var validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码，长度在 6 到 20 个字符'));
      //   } else {
      //     if (this.ruleForm2.checkPass !== '') {
      //       this.$refs.ruleForm2.validateField('checkPass');
      //     }
      //     callback();
      //   }
      // };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        show: false,
        show1: false,
        show2: false,
        ruleForm: {
          user: '',
          notice: '',
          oldpass: '',
          pass: '',
          checkPass: '',
          email: '',
        },
        rules: {
          user: [
            { required: true, message: '请输入新用户名', trigger: 'blur' },
            { message: '字母或汉字开头，可使用数字及下划线', trigger: 'blur'}
          ],
          oldpass: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  /* panel */
  .panel {
    position: relative;
    background-color: #fff;
    padding: 10px 15px;
  }

  .panel .panel-heading {
    position: relative;
    font-size: 17px;
    border-bottom: 2px solid #f5f5f5;
  }

  .lf {
    text-align: left;
  }

  .rg {
    text-align: right;
  }

  .el-row {
    margin-bottom: 8px;
  }

  .panel-body {
    margin: 10px;
    width: 500px;
  }

  .infobox {
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: solid 1px #000;
  }

  a:hover {color: #409EFF}

  /* 条件渲染 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
