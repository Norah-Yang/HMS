<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column  prop="roomid" label="ID"></el-table-column>
        <el-table-column  prop="detail" label="房间信息"></el-table-column>
        <el-table-column  prop="price" label="房间价格"></el-table-column>
        <el-table-column  prop="state" label="房间状态"></el-table-column>
      
    </el-table>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
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
    }
  },
  components: {}
};
</script>
<style scoped>
</style>