<template>
  <div class="panel">
    <!-- Form -->
    <el-dialog
     title="新增用户信息" 
     :visible.sync="dialogFormVisible"
     width="30%" >
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="formLabelAlign.type" placeholder="请选择">
            <el-option label="类型一" value="admin"></el-option>
            <el-option label="类型二" value="user"></el-option>
          </el-select>
        </el-form-item>
        <!-- 头像上传 -->
        <label class="el-form-item__label">上传头像</label>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>


    <div class="panel-heading">
      <el-row :gutter="20">
        <el-col :span="6"><div class="lf" style="font-size: 20px;">用户管理</div></el-col>
        <el-col :span="6" :offset="12">
          <div class="rg">
            <el-button class="btn-pink" @click="dialogFormVisible = true">新增<i class="el-icon-plus el-icon--right"></i></el-button>
            <el-button type="success">导出<i class="el-icon-upload el-icon--right"></i></el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="panel-body">
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: left;margin: 10px;">
          <el-form :inline="true" :model="formInline" class="">
            <el-form-item label="用户名:">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="手机:">
              <el-input v-model="formInline.user"></el-input>
            </el-form-item>
            <el-form-item label="用户类型:">
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
        style="width: 1001px">

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
          label="用户名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="手机号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="address"
          label="用户类型"
          width="120">
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
            <el-button type="text" size="small">头像</el-button>
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
    name: "userlist",
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市'
      };
      return {
        imageUrl: '',
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',

        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
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
      },
      // 头像
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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

  /* 头像 */
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: 160px;
    height: 160px;
    display: block;
  }

</style>