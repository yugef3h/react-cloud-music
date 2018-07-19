<template>
  <div id="hd">
    <div  class="adm" style="">
      <!-- 无新消息时隐藏 -->
      <div class="el-badge item" @click="getnews">
        <i class="el-icon-bell" style="font-size: 22px; float: right;"></i>
        <sup class="el-badge__content is-fixed" style="display: block;">{{belltext}}</sup>
      </div>
      
      <a href="#" class="set" style="cursor: default;">超级管理员</a>
      ·
      <router-link to="/index/sys/settings" class="set">设置</router-link>
      ·
      <router-link to="/" class="set">退出</router-link>
    </div>
  </div>
</template>

<script>

  export default {
    name: "header-bar",
    data() {
      return {
        belltext: "new"
      };
    },
    methods: {
      getnews () {
        // 跳转路由
      }
    }
  }
</script>

<style>

  #hd {
    position: relative;
  }

  .adm {
    position: absolute;
    right: 0;
    height: 40px;
    line-height: 40px;
  }

  .item {
    margin-top: 7px;
    margin-right: 25px;
  }

  .el-badge__content.is-fixed {
    position: absolute;
    top: 0;
    right: 14px;
    -webkit-transform: translateY(-50%) translateX(100%);
    transform: translateY(-50%) translateX(100%);
   
  }

  a.set {
    font-size: 13px;
    color: #000;
  }

</style>