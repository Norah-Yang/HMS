<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column  prop="roomid" label="ID"></el-table-column>
        <el-table-column  prop="detail" label="房间信息"></el-table-column>
        <el-table-column  prop="price" label="房间价格"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="open(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   <el-dialog title="添加房间" :visible.sync="dialogFormVisible" :append-to-body="true">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID" prop="roomid">
                    <el-input v-model="ruleForm.roomid" placeholder="请输入房间ID" disabled></el-input>
                </el-form-item>
                <el-form-item label="房间信息" prop="detail">
                    <el-select id="detail" v-model="ruleForm.detail" placeholder="--请选择--">
                        <el-option label="高级双床房" value="高级双床房"></el-option>
                        <el-option label="高级大床房" value="高级大床房"></el-option>
                        <el-option label="温馨亲子房" value="温馨亲子房"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间价格" prop="price">
                    <el-input v-model="ruleForm.price" placeholder="请输入房间价格"></el-input>
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
      url: "/api/roomlist",
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
          roomid: '',
          detail:'',
          price:''
        },
        rules: {
          detail: [
            { required: true, message: '请选择房间类型', trigger: 'change' }
          ],
          price: [
            { required: true,message: '请输入房间价格', trigger: 'blur' },
            { min: 1, message: '请输入正确的房间价格', trigger: 'blur' }
          ],
        },
        dialogFormVisible: false,
        formLabelWidth: '120px'
    };
  },
  methods: {
      edit(index, row) {
        this.ruleForm.roomid = row.roomid;
        this.ruleForm.detail = row.detail;
        this.ruleForm.price = row.price;
        this.dialogFormVisible=true
        // console.log(row.roomid);
      },
      submitForm(formName) {
        //   console.log(this.ruleForm.roomid)
            var roomid = this.ruleForm.roomid;
            var detail = this.ruleForm.detail;
            var price = this.ruleForm.price;
        if(roomid&&detail&&price){
          this.dialogFormVisible=false;
          this.$refs[formName].validate((valid) => {
            // console.log(roomid+detail+price)
            this.axios({
            url:'/api/roomChange',
            method:'get',
            params:{
                      roomid,
                      detail,
                      price
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
        var roomid = row.roomid;
        // console.log(roomid)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios({
              url:"/api/roomDel/"+roomid,
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