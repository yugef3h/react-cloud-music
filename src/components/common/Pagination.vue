<template>
  <div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="200">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "pagination"
  }
</script>

<!-- lib组件取消scope -->
<style>
  .el-pagination.is-background .el-pager li {
    border-radius: 0;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #222222;
  }

  /* pagination */
  .el-pagination.is-background .el-pager li:hover {
    background-color: #e1e1e1;
    color: #606266 !important;
  }


</style>