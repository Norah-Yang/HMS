<template>
    <div>
        
        <el-container class="container">
            <el-header class="header" height="70px">
                <h1 @click="go()">后台管理系统</h1>
                <div class="btn">
                    欢迎您：<span id="name">{{name}}</span>
                    <span @click="logout()">
                        退出登录
                    </span>
                </div>
            </el-header>
            <el-container>
                <el-aside class="aside" width="20%">
                    <el-menu
                        v-bind:router="true"
                        default-active="activeIndex"
                        class="el-menu-vertical-demo"
                        :unique-opened="true"
                        background-color="#D3DCE6"
                        text-color="#000"
                        active-text-color="#666">
                        <el-menu-item index="/home">
                            <i class="el-icon-bangzhu"></i>
                            <span slot="title">房态盘</span>
                        </el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>员工信息</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/useradd">用户添加</el-menu-item>
                                <el-menu-item index="/userlist">用户删改</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span>房间信息</span>
                            </template>
                            <el-menu-item-group>
                            <el-menu-item index="/roomadd">客房添加</el-menu-item>
                            <el-menu-item index="/roomlist">客房删改</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>房间管理</span>
                            </template>
                            <el-menu-item-group>
                            <el-menu-item index="/roomstate">房间状态信息</el-menu-item>
                            <el-menu-item index="/booking">预订</el-menu-item>
                            <el-menu-item index="/cancel">退订</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="/log">
                            <i class="el-icon-s-order"></i>
                            <span slot="title">消费记录查询</span>
                        </el-menu-item>
                        <el-menu-item index="/changePsw">
                            <i class="el-icon-s-tools"></i>
                            <span slot="title">修改密码</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    created() {
        // var 
    },
    data() {
        return {
            name:localStorage.getItem("username")
        }
    },
    methods: {
        go(){
            this.$router.push({path:"/home"})
        },
        logout(){
            window.localStorage.removeItem("username");
            window.localStorage.removeItem("userid");
            alert("退出成功")
            this.$router.push({path:"/login"})
        }
    },
    computed: {
        activeIndex(){
            return this.$route.path
        }
    },
}
</script>
<style scoped>
.container{
    height: 100%;
}
.el-header{
    position: sticky;
    top: 0;
    background-color: #B3C0D1;
    display: flex;
    justify-content: space-between;
    line-height: 70px;
    color: #000;
    z-index: 999;
}
h1{
    text-indent: 20px;
    cursor: pointer;
}
.btn{
    margin-right: 20px;
    font-size: 20px;
}
.btn span{
    margin-left: 20px;
}
  
.aside {
    position: fixed;
    height: 100%;
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
    border-right: 2px solid #e6e6e6
}
.main{
    position: fixed;
    right:0;
    height:100%;
    background-color: #E9EEF3;
}
.el-menu{
    border: none;
}
.el-main {
    color: #333;
    width:80%;
}
  
body > .el-container {
    margin-bottom: 40px;
}
</style>