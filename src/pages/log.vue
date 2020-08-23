<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column  prop="c_name" label="入住人"></el-table-column>
        <el-table-column  prop="c_card" label="身份证号"></el-table-column>
        <el-table-column  prop="info" label="入住日期"></el-table-column>
        <el-table-column  prop="roomid" label="房间号"></el-table-column>
        <el-table-column  prop="time_length" label="入住天数"></el-table-column>
        <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"
          @input="find()"/>
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
      url: "/api/msgList",
      method: "get"
    }).then(ok => {
      // console.log(ok);
      this.tableData = ok.data;
    });
  },
  data() {
    return {
      tableData: [],
      search:''
    }
  },
  components: {},
  methods: {
    find(){
      var msg = this.search
      // console.log(this.search)
      this.axios({
        url:'/api/findMsg',
        method:'get',
        params:{msg}
      }).then((ok)=>{
        // console.log(ok.data)
        this.tableData = ok.data
      })
    }
  },
};
</script>
<style scoped>
</style>