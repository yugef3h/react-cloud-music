<template>
  <div id="aside">
    <el-menu
      :default-openeds="['1', '2']"
      class=""
      @open="handleOpen"
      @close="handleClose"
      background-color="#2c2e2f"
      text-color="#979898"
      active-text-color="#fff"
      router>
      <div class="res-title"><router-link to="/index" style="color: white;">BLOG</router-link></div>

      <el-submenu index="1">
        <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="/index/sys/settings">&nbsp;基础设置</el-menu-item>
          <el-menu-item index="/index">&nbsp;个人资料</el-menu-item>
          <el-menu-item index="/index/sys/userlist">&nbsp;用户管理</el-menu-item>
        </el-menu-item-group>
        <!-- <el-menu-item-group title="分组2">
          <el-menu-item index="/index">&nbsp;用户管理</el-menu-item>
        </el-menu-item-group> -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-tickets"></i>博文管理</template>
        <el-menu-item-group>
          <template slot="title">分组二</template>
          <el-menu-item index="/index/blog/blogcate">&nbsp;博文分类</el-menu-item>
          <el-menu-item index="/index/blog/blogmanage">&nbsp;博文管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <li role="menuitem" aria-haspopup="true" class="el-submenu" style="position: relative;">
        <div class="el-submenu__title">
          <router-link to="/" style="position: absolute; width: 100%;left: 0;"><i class="el-icon-news"></i>退出系统</router-link>
        </div>
      </li>

    </el-menu>
  </div>


</template>

<script>
  export default {
    name: "aside-bar",
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .res-title {
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: white;
    border-bottom: 1px solid #313437;
    background-color: #2c2e2f;
    font-size: 30px;
  }

  .el-submenu.is-active .el-submenu__title {
    border-bottom-color: inherit;
  }

  .el-submenu, .el-menu-item {
    border-bottom: 1px solid #313437;
  }

  .el-menu-item {
    padding: 0 14px;
  }

  .el-menu {
    border-right: 0;
  }

  a.router-link-active {
    color: inherit;
  }




</style>