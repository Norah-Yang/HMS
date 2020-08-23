<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column  prop="userid" label="ID"></el-table-column>
        <el-table-column  prop="username" label="用户名"></el-table-column>
        <el-table-column  prop="ident" label="身份"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :append-to-body="true">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID" prop="userid">
                    <el-input v-model="ruleForm.userid" placeholder="请输入用户ID" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input id="username" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                
                <el-form-item label="身份" prop="ident">
                    <el-select id="ident" v-model="ruleForm.ident" placeholder="--请选择--">
                        <el-option label="管理员" value="管理员"></el-option>
                        <el-option label="前台" value="前台"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                <el-button @click="dialogFormVisible=false">取消</el-button>
            </div>
        </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
    inject:['reload'],
  created() {
    this.axios({
      url: "/api/userlist",
      method: "get"
    }).then(ok => {
      this.tableData = ok.data;
    //   window.console.log(this.tableData);
    });
  },
  data() {
    return {
      tableData: [],
      ruleForm: {
          username: '',
          ident:''
        },
        rules: {
          username: [
            { required: true,message: '请输入用户名', trigger: 'blur' },
            { min: 1, message: '请输入正确的用户名', trigger: 'blur' }
          ],
          ident: [
            { required: true, message: '请选择您的职业', trigger: 'change' }
          ],
        },
        dialogFormVisible: false,
        formLabelWidth: '120px'
    };
  },
  methods: {
      edit(index, row) {
        this.ruleForm.userid = row.userid;
        this.ruleForm.username = row.username;
        this.ruleForm.ident = row.ident;
        this.dialogFormVisible=true
        // console.log(row.userid);
      },
      submitForm(formName) {
        //   console.log(this.ruleForm.userid)
            var userid = this.ruleForm.userid;
            var username = this.ruleForm.username;
            var ident = this.ruleForm.ident;
        if(userid&&username&&ident){
          this.dialogFormVisible=false;
          this.$refs[formName].validate((valid) => {
            // console.log(userid+username+ident)
            this.axios({
            url:'/api/userChange',
            method:'get',
            params:{
                      userid,
                      username,
                      ident
                  }
        }).then((ok)=>{
          // console.log(ok);
          if(ok==1){
            alert("修改失败")
          }else{
            alert("修改成功");
            this.reload()
          }
        })
        });
        }else{
          alert("请将内容填写完整")
        }
      },
      open(index, row) {
        var userid = row.userid;
        // console.log(userid)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
              url:"/api/userDel/"+userid,
              method:"get"
          }).then(ok=>{
            //   console.log(ok.data)
              if(ok.data==1){
                  this.reload()
              }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
    },
  components: {}
};
</script>
<style scoped>
</style>