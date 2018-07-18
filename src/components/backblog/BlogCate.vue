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
      <el-table :data="tableData" border @selection-change="handleSelectionChange" stripe size="mini">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="nameEn" label="英文名称"></el-table-column>
        <el-table-column prop="creater" label="创建人"></el-table-column>
        <el-table-column prop="date" label="创建时间"></el-table-column>
        <el-table-column label="操作">
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
    components: {
      pg
    },
    data() {
      return {
        tableData: [],
        multipleSelection: []
      }
    },
    mounted:function(){

    },
    created:function(){
			this.findRestaurantMenuCategoryPage();
    },
    methods: {
      // 加载分类信息
      findRestaurantMenuCategoryPage () {
        this.$axios.get(global.APIPATH + "/restaurant/findRestaurantMenuCategoryPage", {
              headers: {'X-Authorization': 'Bearer ' + localStorage.getItem("token")}
           }
        ).then(function(res){

        }.bind(this)).catch(function(error){
            console.info(error);
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
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
