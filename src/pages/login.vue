<template>
    <div class="login">
        <div class="log">
            <h1>登录</h1>
            <div class="log_body">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="id" label-width="51px">
                        <el-input v-model="ruleForm.id"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" label-width="51px">
                        <el-input type="password" v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                    <div class="msg"></div>
                    
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jQuery'
export default {
    data() {
        return {
            value1:true,
            ruleForm:{
                id:"",
                password:""
            },
            rules: {
                id: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 1, message: '请输入正确的账号', trigger: 'blur' }
                ],
                password:[
                    {required:true, message: '请输入密码'},
                    { min: 6, message: '密码不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        login(){
            //获取表单数据
            var  userid = this.ruleForm.id;
            var  password = this.ruleForm.password;
            var that = this;
            $.ajax({
                url:"/api/login",
                type:"post",
                data:{userid,password},
                success(ok){
                    console.log(ok)
                if(ok==1){
                    $(".msg").html("用户名或密码错误，请重新输入！");
                }else{

                    //登录成功后五秒跳转
                            that.$router.push({path:'home'});
                        //    console.log(ok[0].username) 
                    localStorage.setItem("userid",userid)
                    localStorage.setItem("username",ok[0].username)
                }
                            
                }
            })
        }
    }
}
</script>
<style scoped>
.login{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('../../public/bg.jpg') 50% no-repeat;
    background-size: cover;
    overflow: hidden;
}
.log{
    width: 400px;
    height: 450px;
    background-color: white;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px;
}
h1{
    text-align: center;
    color: #303133;
    line-height: 100px;
    padding: 10px 20px;
    border-bottom: 1px solid #ebeef5;
}
.log_body{
    padding: 20px;
}
.el-form-item__label{
    width: 50px;
}
.el-switch{
    color: #303133;
    margin-bottom: 35px;
}
.el-button{
    display: block;
    width: 100%;
    margin-bottom: 10px;
}
.el-button+.el-button {
    margin-left: 0;
}
.msg{
    width: 100%;
    text-align: right;
    margin-top: 10px;
    font-size: 12px;
}
</style>