<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户搜索和添加 -->
    <el-row>
      <el-col>
        <el-input
          @clear="clearSearch()"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
        </el-input>
        <el-button type="success" @click="addUsers">添加</el-button>
      </el-col>
    </el-row>
    <!-- 用户数据渲染 -->
    <el-table :data="userList" style="width: 100%" max-height="360px">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="180">
        <template slot-scope="scope">{{scope.row.create_time|fmtdate}}</template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="active" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handelDelete(scope.row.id)"
          ></el-button>
          <el-button size="mini" type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 对话框添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd" class="addUsers">
      <el-form :model="form" :rules="rules" ref='form'>
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handelCancel('form')">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      query: "",
      pagenum: 1,
      pagesize: 2,
      userList: [],
      total: 0,
      dialogFormVisibleAdd: false,
      form: {
        // username 用户名称 不能为空
        // password 用户密码 不能为空
        // email 邮箱 可以为空
        // mobile 手机号 可以为空
        username: "",
        password: "",
        email: "",
        mobile: ""
      },

      formLabelWidth: "120px"
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    handelCancel() {
      this.dialogFormVisibleAdd = false
      this.$refs[formName].resetFields()
    },
    handelDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async userID => {
          const res = await this.axios.delete(`users/${userID}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async handleAdd() {
      const res = await this.axios.post("users", this.form);
      console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 201) {
        this.getUserList();
        this.form = {};
        this.$message.success(msg);
        this.dialogFormVisibleAdd = false;
      }
    },
    addUsers() {
      this.dialogFormVisibleAdd = true;
    },
    clearSearch() {
      this.getUserList();
    },
    searchUser() {
      this.getUserList();
    },
    async getUserList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      // query 查询参数 可以为空
      // pagenum 当前页码 不能为空
      // pagesize 每页显示条数 不能为空
      const res = await this.axios.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      console.log(res);
      const {
        meta: { msg, status },
        data: { users, total }
      } = res.data;

      if (status === 200) {
        this.userList = users;
        this.total = total;
        this.$message.success(msg);
      } else {
        this.$message.waring(msg);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.pagenum = 1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
    }
  }
};
</script>

<style>
.input-with-select {
  width: 300px;
  margin-top: 16px;
}
</style>
