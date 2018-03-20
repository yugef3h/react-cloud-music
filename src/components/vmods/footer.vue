<!--
lack of QQ WeChat
href tobe modify
router-link tobe modify
 -->
<template>
  <div id="footer">
      Copyright © 2017-2018 <a href="http://www.blackatall.cn">Yuge Blog</a><span> All Rights Reserved. 闽ICP备17030754号-1</span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #footer {
    width:1000px;
    padding-top: 10px;
    text-align: center;
    border-top: 1px solid #d6d9de;
    margin: 20px auto 10px;
    a {
      margin: 0 5px;
      outline: 0;
    }
    a:visited {
      color: #075db3;
      text-decoration: underline;
    }
    a:link {
      color: #075db3;
      text-decoration: underline;
    }
  }
  @media screen and (max-height:1023px){
    #footer {
      width:98%;
    }
  }
</style>
