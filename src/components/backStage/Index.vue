<template>
  <div id="index">
    <el-container>

      <el-aside>
        <as></as>
      </el-aside>

      <el-container>

        <el-header>
          <hd></hd>
        </el-header>


        <div class="page-title">
          <mn></mn>

        </div>
        <el-main>

          <router-view></router-view>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import as from '../common/AsideBar.vue'
  import hd from '../common/HeaderBar.vue'
  import mn from '../common/MiniBar.vue'
  export default {
    name: "backindex",
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
    },
    components: {
      as,
      hd,
      mn
    }
  }
</script>

<style scoped>
  .el-container:nth-child(1) {
    height: 100vh;
  }

  .el-menu {
    border-right: inherit !important;
  }

  .el-header {
    height: 40px !important;
    line-height: 40px;
    background-color: #fff;
    color: #333;
    text-align: right;
    font-size: 12px
  }

  .el-aside {
    text-align: center;
    width: 230px !important;
    color: #333;
    background-color: #2c2e2f;
  }

  .page-title {
    height: 40px;
    background-color: #f8f8f8;
  }

  .el-main {
    background-color: #eee;
  }



</style>