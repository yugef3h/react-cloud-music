<template>
  <div class="minav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/home' }"><i class="el-icon-location"></i>首页</el-breadcrumb-item>
      <el-breadcrumb-item v-show="basicTtile !== '首页'">{{basicTtile}}</el-breadcrumb-item>
      <el-breadcrumb-item v-show="basicTtile !== '首页'"><strong style="font-weight: 600;">{{pageTitle}}</strong></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>

  let pageTitleObj = {
    "sys": "系统设置",
    "blog": "博文管理",
    "blogmanage": "博文管理",
    "blogcate": "博文分类",
    "settings": "基础设置",
    "userlist": "用户管理",
  };

  export default {
    name: "mini-bar",
    data () {
      let path = this.$route.path;
      return {
        basicTtile: pageTitleObj[path.split('/')[2]] || "首页",
        pageTitle: pageTitleObj[ path.substr( path.lastIndexOf("/") + 1)] || "首页",
      }
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          let path = val.path;
          this.pageTitle = pageTitleObj[path.substr( path.lastIndexOf("/") + 1 )] || "首页";
          this.basicTtile = pageTitleObj[path.split('/')[2]] || "首页"
        }
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    line-height: 40px;
    padding-left: 15px;
  }


</style>