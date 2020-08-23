<template>
    <div>
        <h2>修改密码</h2>
        <table border="1" cellspacing="0">
            <tr>
                <td class="tit">用户ID</td>
                <td>{{id}}</td>
            </tr>
            <tr>
                <td class="tit">原密码</td>
                <td>
                    <input type="password" class="old" @blur="getPsw()">
                    <span class="text"></span>
                </td>
            </tr>
            <tr>
                <td class="tit">新密码</td>
                <td><input type="password" class="new"></td>
            </tr>
            <tr>
                <td class="tit">请再次输入密码</td>
                <td>
                    <input type="password" class="new_sec" @blur="new_sec()">
                    <span class="msg"></span>
                </td>
                
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <button @click="changePsw()">修改密码</button>
                    <button @click="clear()">取消</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    created() {
        
    },
    data() {
        return {
            id:localStorage.getItem("userid"),
            expsw:''
        }
    },
    methods: {
        getPsw(){
            var userid = localStorage.getItem("userid")
            var psw_old = $(".old").val();
            this.axios({
                url:'api/findPsw',
                method:'get',
                params:{userid}
            }).then((ok)=>{
                // console.log(ok.data[0].userpass)
                this.expsw = ok.data[0].userpass

                if(psw_old!=this.expsw){
                    $(".text").html('密码错误');
                }else{
                    $(".text").html("");
                }
            })
        },
        changePsw(){
            var psw_new = $(".new").val();
            var old = $(".old").val();
            var userid = localStorage.getItem("userid")
            // console.log(old==null)
            console.log($(".text").text())
            if(old==''||old!=this.expsw){   
                this.$message({
                type:'error',
                message: '请输入原密码'             
                 })
           }else if(psw_new.length<=5){
                this.$message({
                    type:'error',
                    message: '密码长度要至少为6位'             
                })
            }else if($(".new_sec").val()==''||$(".new_sec").val()!=psw_new){
                this.$message({
                    type:'error',
                    message: '请确认密码'             
                })
            }else{
                this.axios({
                    url:'api/changePsw',
                    method:'get',
                    params:{psw_new,userid}
                }).then((ok)=>{
                    console.log(ok.data)
                    if(ok.data==1){
                        window.localStorage.removeItem("username");
                        window.localStorage.removeItem("userid");
                        this.$router.push({path:'login'});
                    }
                })
            
            }
        },
        new_sec(){
            var psw_new = $(".new").val();
            var psw_sec = $(".new_sec").val();
            // console.log(psw_new)
            if(psw_sec!=psw_new){
                $(".msg").html('两次密码不一致，请重新输入');
            }
        },
        //取消
        clear(){
            $("input").val('');
            $(".text").html('');
            $(".msg").html('');
        }
        
    },
    
}
</script>
<style scoped>
    table{
        margin-top: 50px;
        width: 550px;
    }
    tr{
        height: 35px;
    }
    td:nth-child(2n){
        text-indent: 20px;
    }
    .tit{
        width: 150px;
        text-align: center;
    }
    button:first-child{
        margin-right: 20px;
    }
    button:last-child{
        margin-left: 20px;
    }
    .msg , .text{
        padding-left: 20px;
        font-size: 12px;
        color: crimson;
    }
</style>