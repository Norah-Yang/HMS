<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" prop="roomid"></el-table-column>
      <el-table-column label="房间信息" prop="detail"></el-table-column>
      <el-table-column label="房间价格" prop="price"></el-table-column>
      <el-table-column label="房间状态" prop="state"></el-table-column>
    </el-table>

    <el-dialog title="添加房间" :visible.sync="open" :append-to-body="true">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="ID" prop="roomid">
                    <el-input v-model.number="ruleForm.roomid" placeholder="请输入房间ID"></el-input>
                </el-form-item>                
                <el-form-item label="房间信息" prop="detail">
                    <el-select v-model="ruleForm.detail" placeholder="--请选择--">
                        <el-option label="高级双床房" value="高级双床房"></el-option>
                        <el-option label="高级大床房" value="高级大床房"></el-option>
                        <el-option label="温馨亲子房" value="温馨亲子房"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间价格" prop="price">
                    <el-input v-model.number="ruleForm.price" placeholder="请输入房间价格"></el-input>
                </el-form-item>
                <el-form-item label="房间状态" prop="state">
                    <el-input v-model.number="ruleForm.state" placeholder="空"></el-input>
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
  created() {
    this.axios({
        url:'/api/roomlist',
        method:'get'
    }).then((ok)=>{
      console.log(ok.data)
        this.tableData = ok.data;
    })
  },
  data() {
    return {
      tableData: [],
      search: "",
      ruleForm: {
          roomid: '',
          detail: '',
          price:'',
          state:'空'
        },
        rules: {
          roomid: [
            { required: true, message: '请输入房间ID', trigger: 'blur' },
            { type:'number', min: 1, message: '用户ID必须为数字值', trigger: 'blur' }
          ],
          detail: [
            { required: true, message: '请选择房间信息', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请输入房间价格', trigger: 'blur' },
            { type:'number', min: 1, message: '房间价格必须为数字值', trigger: 'blur' }
          ]
        },
        open: false,
        formLabelWidth: '120px'
    };
  },
  methods: {
      submitForm(formName) {
          console.log(this.ruleForm.roomid)
            var roomid = this.ruleForm.roomid;
            var detail = this.ruleForm.detail;
            var price = this.ruleForm.price;
            var state = this.ruleForm.state;
        if(roomid&&detail&&price&&state){
          this.open=false;
          this.$refs[formName].validate((valid) => {
            console.log(roomid+detail+price)
            this.axios({
            url:'/api/roomadd',
            method:'get',
            params:{
                      roomid,
                      detail,
                      price,
                      state
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
};
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