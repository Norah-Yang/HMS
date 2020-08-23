<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column  prop="roomid" label="房间号"></el-table-column>
        <el-table-column  prop="c_name" label="入住人"></el-table-column>
        <el-table-column  prop="c_tel" label="联系方式"></el-table-column>
        <el-table-column  prop="info" label="入住日期"></el-table-column>
        <el-table-column  prop="time_length" label="入住天数"></el-table-column>
        <el-table-column  prop="price" label="房间单价"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="cancel(scope.$index, scope.row)">退房</el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
inject:['reload'],
  created() {
    this.axios({
      url: "/api/cancelList",
      method: "get"
    }).then(ok => {
      // console.log(ok);
      this.tableData = ok.data;
    });
  },
  data() {
    return {
      tableData: [],
    }
  },
  components: {},
  methods: {
    cancel(index, row) {
      var roomid = row.roomid;
      var state = '空'
      console.log(roomid)
      this.$alert('您需要缴纳的房费为 '+row.time_length*row.price+' 元', '退房', {
          confirmButtonText: '确定',
          callback: action => {
            this.axios({
              url:"/api/cancel",
              method:'get',
              params:{roomid,state}
            }).then((ok)=>{
              console.log(ok.data)
              if(ok.data==1){
                this.reload()
              }
            })
          }
      });
    }, 
  },
};
</script>
<style scoped>
</style>