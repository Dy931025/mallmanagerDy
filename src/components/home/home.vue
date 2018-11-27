<template>
<el-container class="container">
    <el-header class="homeHeader">
        <el-col :span="8">
            <div class="grid-content bg-purple logoTop">
                <img src="../../assets/logo.png" alt>
        </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple-light">电商后台管理系统</div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple loginOut">
                <el-button type="primary" icon="el-icon-search" @click.prevent='handleOut()'>退出</el-button>
            </div>
        </el-col>
    </el-header>
    <el-container>
        <el-aside width="200px" class="homeSlider">
            <el-menu default-active="2" :unique-opened="true" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="user">
                        <i class="el-icon-menu"></i>
                        <span>用户列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>角色列表</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>权限列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>商品列表</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>分类参数</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>商品分类</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>订单列表</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>统计列表</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="homeMain">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    beforeCreate() {
        const token = localStorage.getItem('token')
        if (!token) {
            this.$router.push('login')
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleOut: function () {
            //   退出清除本地缓存
            localStorage.clear()

            this.$message.success('退出成功！')
            this.$router.push({
                name: 'login'
            })
        }
    }
}
</script>

<style>
.container {
    height: 100%;
}

.homeHeader {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.homeSlider {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
    height: 100%;
}

.homeMain {
    background-color: #E9EEF3;
    color: #333;
}

.bg-purple-light {
    font-size: 26px;
    font-weight: 700;
}

.logoTop {
    float: left;
}

.loginOut {
    float: right;
}

.box-card {
    height: 100%;
}
</style>
