<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="roomid" label="ID"></el-table-column>
      <el-table-column prop="detail" label="房间信息"></el-table-column>
      <el-table-column prop="price" label="房间价格"></el-table-column>
      <el-table-column prop="state" label="房间状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="book(scope.$index, scope.row)">预订</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 预订 -->
    <el-dialog title="房间预订" :visible.sync="booking" :append-to-body="true">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="ID" prop="roomid">
          <el-input v-model="ruleForm.roomid" placeholder="房间ID" disabled></el-input>
        </el-form-item>
        <el-form-item label="房间信息" prop="detail">
          <el-input v-model="ruleForm.detail" placeholder="房间信息" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="cust_name">
          <el-input v-model="ruleForm.cust_name" placeholder="顾客姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="cust_contact">
          <el-input type='number' v-model="ruleForm.cust_contact" placeholder="联系方式"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="cust_IDcard">
          <el-input v-model="ruleForm.cust_IDcard" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item label="入住/离店" prop="info">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">——</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date2"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="clear()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import $ from "jquery";
export default {
    inject:['reload'],
  created() {
    this.axios({
      url: "/api/roomlist",
      method: "get"
    }).then(ok => {
      this.tableData = ok.data;
    });
  },
  data() {
    return {
      tableData: [],
      booking: false,
      ruleForm: {
          roomid: '',
          detail:'',
          cust_name:'',
          cust_contact:'',
          cust_IDcard:'',
          date1:'',
          date2:'',
          state:'',
          info:''
        },
        rules: {
          cust_name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, message: '请输入正确的姓名', trigger: 'blur' }
          ],
          cust_contact: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min:11,max: 11, message: '请输入正确的手机号', trigger: 'blur' }
          ],
          cust_IDcard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { min: 18, max:18,message: '请输入正确的身份证号', trigger: 'blur' }
          ]
        },
    };
  },
  methods: {
    book(index, row) {
      if(row.state=="空"){
        this.ruleForm.roomid = row.roomid;
        this.ruleForm.detail = row.detail;
        this.ruleForm.price = row.price;
        this.ruleForm.state = '订';
        this.booking = true;
      }else{
        this.$message({
          type:'error',
          message: '该房间无法预定！'
        })
      }
    }, 
    clear(){
      $("input").not(':disabled').val('');
      this.booking=false;
    },
    submitForm(formName) {
        //   console.log(this.ruleForm.userid)
            var roomid = this.ruleForm.roomid;
            var state = this.ruleForm.state;
            var d1 = new Date(this.ruleForm.date1);
            var date1=d1.getFullYear() + '/' + (d1.getMonth() + 1) + '/' + d1.getDate();
            var d2 = new Date(this.ruleForm.date2);
            var date2=d2.getFullYear() + '/' + (d2.getMonth() + 1) + '/' + d2.getDate();
            var info = date1+'-'+date2;
            var c_tel = this.ruleForm.cust_contact;
            var c_card = this.ruleForm.cust_IDcard;
            var c_name = this.ruleForm.cust_name;
            var days = d2.getTime()-d1.getTime();
            var time_length = parseInt(days/(1000*60*60*24));
            console.log(d1&&d2)
            console.log(d1)
            console.log(roomid)
        if(d1!='Invalid Date'&&d2!='Invalid Date'){
          this.booking=false;
          this.$refs[formName].validate((valid) => {
            // console.log(userid+username+ident)
            this.axios({
            url:'/api/book',
            method:'get',
            params:{
                      roomid,
                      info,
                      state,
                      c_tel,
                      c_name,
                      c_card,
                      time_length
                  }
        }).then((ok)=>{
          console.log(ok.data);
          if(ok.data==1){
            this.$message({
              type:'success',
              message: '预定成功'             
            })
            this.reload()
          }
        })
        });
        }else{
          this.$message({
            type:'error',
            message: '请将内容填写完整'             
          })
        }
      },
  },
  components: {},
};
</script>
<style scoped>
</style>