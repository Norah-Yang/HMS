<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  provide(){
    return{
       reload:this.reload
    }
  },
  data(){
    return {
       isRouterAlive:true,
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  },
  components: {
  }
}
</script>

<style>
body,p,ul,ol,dl,dd,h1,h2,h3,h4,h5,h6,hr,td,input,textarea{
  margin:0;
  padding:0;
}
li{    
    list-style: none; 
}
a{
    text-decoration: none;
}
body{
  font-family: "微软雅黑";
}
</style>
