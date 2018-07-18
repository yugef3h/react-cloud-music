<template>
  <div id="hd">
    <div  class="adm" style="">
      <el-menu
        :default-active="activeIndex"
        class=""
        mode="horizontal"
        router
        @select="handleSelect">
        <el-submenu  index="1">
          <template slot="title">超级管理员</template>
          <el-menu-item index="2-1"><i class="el-icon-setting"></i>系统设置</el-menu-item>
          <el-menu-item index="2-2"><i class="el-icon-edit-outline"></i>个人资料</el-menu-item>
          <el-menu-item index="2-3"><i class="el-icon-info"></i>帮助文档</el-menu-item>
          <el-menu-item index="/"><i class="el-icon-sold-out"></i>退出系统</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>

  export default {
    name: "header-bar",
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 40px !important;
    line-height: 40px !important;
  }

  #hd {
    position: relative;
  }

  .adm {
    position: absolute;
    right: 0;
  }

  .el-menu--horizontal {
    border-bottom: inherit !important;
  }


</style>