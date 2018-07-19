<template>
  <div class="panel">
    <div class="panel-heading">
      <el-row :gutter="20">
        <el-col :span="6"><div class="lf" style="font-size: 20px;">博文分类</div></el-col>
        <el-col :span="6" :offset="12">
          <div class="rg">
            <el-button class="btn-pink">新增<i class="el-icon-plus el-icon--right"></i></el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="panel-body">



      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        stripe
        size="mini"
        style="width: 881px">

        <el-table-column
          type="index"
          label="#"
          width="80">
        </el-table-column>
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->

        <el-table-column
          prop="name"
          label="分类名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建人"
          width="200">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" style="color: #ff6264;">删除</el-button>


          </template>
        </el-table-column>
      </el-table>




      <el-row :gutter="20">
        <el-col :span="14" :offset="10">
          <pg style="margin: 20px 0 5px;text-align: right;"></pg>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import pg from '../common/Pagination.vue'
  export default {
    name: "blog-cate",
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市'
      };
      return {
        tableData: Array(10).fill(item),
        formInline: {
          user: '',
          region: ''
        },
        multipleSelection: []
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    components: {
      pg,
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

  .btn-pink {
    background-color: #7c38bc;
    color: #ffffff;
  }

  .btn-pink:hover {
    background-color: #9c3fbf;
    color: #ffffff;
  }

  .panel-body {
    margin: 10px;
  }

</style>