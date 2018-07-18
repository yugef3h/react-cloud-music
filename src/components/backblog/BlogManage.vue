<template>
  <div class="panel">
    <div class="panel-heading">
      <el-row :gutter="20">
        <el-col :span="6"><div class="lf" style="font-size: 20px;">博文管理</div></el-col>
        <el-col :span="6" :offset="12">
          <div class="rg">
            <el-button class="btn-pink">新增<i class="el-icon-plus el-icon--right"></i></el-button>
            <el-button type="success">导出<i class="el-icon-upload el-icon--right"></i></el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="panel-body">
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: left;margin: 10px;">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="菜名:">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="编号:">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="分类:">
              <el-select v-model="formInline.region">
                <el-option label="热销" value="hot"></el-option>
                <el-option label="海鲜" value="seafood"></el-option>
                <el-option label="汤类" value="soup"></el-option>
                <el-option label="主食类" value="staple"></el-option>
                <el-option label="甜品" value="sweetmeats"></el-option>
                <el-option label="素菜" value="vegetarian"></el-option>
                <el-option label="肉类" value="meat"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>


      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        stripe
        size="mini">
        <el-table-column
          type="index"
          label="#"
          width="50">
        </el-table-column>
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="date"
          label="菜品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="分类"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column

          label="操作"
          width="180">
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
    name: "blog-manage",
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
    text-color: #ffffff;
  }



</style>