<template>
  <div class="home">
    <div class="info">
      <div class="roomState" v-for="(v,i) in tableData" :class="v.state=='订'?'state_selected':'state_null'">
        <h3>{{v.roomid}}</h3>
        <h3>{{v.detail}}</h3>
      </div>
    </div>
    <div class="bottom">
      <div class="price">
        <dl>
          <dd>高级双床房：87/天</dd>
          <dd>高级大床房：99/天</dd>
          <dd>温馨亲子房：123/天</dd>
        </dl>
      </div>
      <div class="date">当前时间：{{currentTime}}</div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      _this.currentTime = //修改数据date
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds();
    }, 1000);
    this.axios({
      url: "/api/roomlist",
      method: "get"
    }).then(ok => {
      this.tableData = ok.data;
      window.console.log(this.tableData);
    });
  },
  data() {
    return {
      timer: "", //定义一个定时器的变量
      currentTime: new Date(), // 获取当前时间
      tableData:[]
    };
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj;
      } else {
        return obj;
      }
    }
  },
  components: {}
};
</script>
<style scoped>
.home {
  margin: 20px;
}
.info {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  height: 450px;
  overflow: auto;
}
.roomState {
  width: 180px;
  height: 180px;
  margin: 0 20px 10px 0;
}
.state_null{
  background-color: 	#8FBC8F;
}
.state_selected{
  background-color: #B0C4DE;
}
.roomState h3{
  line-height:80px;
  text-align:center;
}
.bottom {
  width:100%;
  bottom:20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.price{
  width:50%;
}
.date {
  width:50%;
  text-align: right;
}
</style>