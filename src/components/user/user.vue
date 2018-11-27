<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="userList" style="width: 100%">
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
          <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          <el-button size="mini" type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      userList: [],
      total: -1
    };
  },
  created() {
    this.getUserList()
  },
  methods: {
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
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    }
  }
}
</script>

<style>
.input-with-select {
  width: 300px;
  margin-top: 16px;
}
</style>
