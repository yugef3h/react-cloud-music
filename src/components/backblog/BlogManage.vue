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
          <el-form :inline="true" :model="formInline" class="">
            <el-form-item label="标题:">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="分类:">
              <el-select v-model="formInline.region">
                <el-option label="随笔" value="essay"></el-option>
                <el-option label="文章" value="article"></el-option>
                <el-option label="日记" value="diary"></el-option>
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
        size="mini"
        style="width: 1101px">

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
          prop="date"
          label="标题"
          width="400">
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="评论数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="阅读数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          width="120">
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
    color: #ffffff;
  }



</style>