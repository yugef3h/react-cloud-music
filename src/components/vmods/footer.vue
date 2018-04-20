<!--
lack of QQ WeChat
href tobe modify
router-link tobe modify
 -->
<template>
  <div id="footer">
      Copyright © 2017-2018 <a href="http://www.blackatall.cn" class="blog">Yuge Blog</a><span> All Rights Reserved. </span><small class="record">闽ICP备17030754号-1</small>
  </div>
</template>
<script>
  export default {}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #footer {
    height:10%;
    color: #8a9399;
    padding-top: 10px;
    text-align: center;
    border-top: 1px solid #d6d9de;
    margin: 20px auto 10px;
    .blog {
      margin: 0 5px;
      outline: 0;
      color: #075db3;
      text-decoration: none;
    }
  }
  @media screen and (max-height:1023px){
    #footer {
      width:98%;
    }
  }
  @media (max-width:767px) {
    .record {
      display: block;
      text-align: center;
    }
  }
  small {
    font-size: 13px;
  }
</style>
