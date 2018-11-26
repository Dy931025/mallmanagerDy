<template>
  <div class="loginBackColor">
    <el-form label-position="top" label-width="80px" :model="formData" class="loginFormStyle">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="loginButton" @click.prevent="loginSubmit()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return{
            formData:{
            username:'',
            password:''
        }
    }},
    methods:{
        async loginSubmit(){
            const res = await this.axios.post('login',this.formData)
                // console.log(res)
                const {
                    data,meta:{msg,status}
                } = res.data
                if(status===200) {
                    this.$message.success(msg)
                    // this.$router.push({name:'home'})
                }else {
                    this.$message.error(msg)
                }
            
        }
    }
}
</script>

<style>
.loginBackColor {
    height: 100%;
    background-color: rgb(31, 33, 117);
    display: flex;
    justify-content: center;
    align-items: center;
}
.loginBackColor .loginFormStyle {
    background-color: #fff;
    width: 400px;
    border-radius: 10px;
    padding:20px;
}
 .loginBackColor .loginFormStyle .loginButton {
     width: 100%;
 }
</style>
