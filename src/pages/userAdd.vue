<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column  prop="userid" label="ID"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="ident" label="身份" ></el-table-column>
        </el-table>

        <el-dialog title="添加用户" :visible.sync="open" :append-to-body="true">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID" prop="userid">
                    <el-input v-model.number="ruleForm.userid" placeholder="请输入用户ID"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                
                <el-form-item label="身份" prop="ident">
                    <el-select v-model="ruleForm.ident" placeholder="--请选择--">
                        <el-option label="管理员" value="管理员"></el-option>
                        <el-option label="前台" value="前台"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">增加</el-button>
                <el-button @click="open=false">取消</el-button>
            </div>
        </el-dialog>
        <div style="margin-top: 20px">
            <el-button type="success" @click="open=true">点击新增</el-button>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
inject:['reload'],
     data() {
      return {
        tableData: [],
        ruleForm: {
          userid: '',
          username: '',
          ident:''
        },
        rules: {
          userid: [
            { required: true, message: '请输入用户ID', trigger: 'blur' },
            { type:'number', min: 1, message: '用户ID必须为数字值', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, message: '请输入正确的用户名', trigger: 'blur' }
          ],
          ident: [
            { required: true, message: '请选择您的职业', trigger: 'change' }
          ],
        },
        open: false,
        formLabelWidth: '120px'
      };
    },
    methods: {
      submitForm(formName) {
          console.log(this.ruleForm.userid)
            var userid = this.ruleForm.userid;
            var username = this.ruleForm.username;
            var ident = this.ruleForm.ident;
            var userpass = '123123';
        if(userid&&username&&ident&&userpass){
          this.open=false;
          this.$refs[formName].validate((valid) => {
            console.log(userid+username+ident)
            this.axios({
            url:'/api/useradd',
            method:'get',
            params:{
                      userid,
                      username,
                      ident,
                      userpass
                  }
        }).then((ok)=>{
          // console.log(ok);
          if(ok==1){
            alert("用户ID重复，请重新设置")
          }else{
            alert("添加成功");
            this.reload()
          }
        })
        });
        }else{
          alert("请将内容填写完整")
        }
      }
    },

    created() {
        this.that = this;
        this.axios({
            url:'/api/userlist',
            method:'get'
        }).then((ok)=>{
            this.tableData = ok.data;
            // window.console.log(ok.data)           
        })
    },


 }
</script>
<style scoped>
.page-header{
    font-size: 28px;
    text-align: center;
    width: 70%;
    margin: 20px;
}
.userAdd{
    padding:20px 50px;
}
.demo-ruleForm{
    width: 70%;
}
</style>