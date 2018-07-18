<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {
      //document.addEventListener('visibilitychange', this.changeTitle, false)
    },
    methods: {
      changeTitle () {            // 切换标签页后，改变title
        if (document.hidden) {
          document.title = '去吧，皮卡丘！'
        } else {
          document.title = '欢迎回来'
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

 /* aside */
  .el-menu-item-group__title {
    display: none;
  }

  .el-submenu__title {
    color: #979898;
    border-bottom: 1px solid #313437;
  }

  .el-submenu.is-active .el-submenu__title {
    border-bottom-color: inherit !important;
  }

  /* when click submenu，mainmenu color: white */
  #aside .el-menu-item:hover, #aside .el-submenu__title:hover {
    background-color: #2c2e2f !important;
    color: white !important;
  }

  ul, ol {
    margin-bottom: 0 !important;
  }

  /* login */
  .el-form-item__content {
    margin-left: 0 !important;
  }

  #login .el-form-item.is-error .el-input__inner {
    border-color: rgba(204, 63, 68, 0.5) !important;
  }

  #login .el-input__inner {
    border-radius: 0 !important;
    height: 40px !important;
    background-color: #313334 !important;
    border: 1px solid transparent !important;
    color: #fff !important;
  }

  #login .el-form-item__label {
    width: 100% !important;
    line-height: 40px !important;
    display: inline-block;
    position: absolute;
  }

    /* header-bar */
  .el-button--mini, .el-button--small {
    border-radius: 0 !important;
  }

    /* mini-bar */
  .el-breadcrumb__inner.is-link {
    font-weight: normal !important;
    color: #606266 !important;
  }

  /* backblog */
  .el-col-14 {
    padding-right: 0 !important;
  }

  .el-table .single {
    background-color: rgba(248,248,248,.5);
  }

  .el-table th{
    background: linear-gradient(to bottom, #f9f9f9 0%,#eaeaea 100%) !important;
    box-shadow: 0 0 2px #bbb;
    border-top: 0 solid #FFF;
  }
</style>

