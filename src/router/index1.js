import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import store from '../store/store'
Vue.use(Router)

let Index=()=>import("@/pages/index")
let Home=()=>import("@/pages/home")
let Userlist=()=>import("@/pages/userlist")
let UserAdd=()=>import("@/pages/userAdd")
let Roomadd=()=>import("@/pages/roomadd")
let Roomlist=()=>import("@/pages/roomlist")
let Roomstate=()=>import("@/pages/roomstate")
let Booking=()=>import("@/pages/booking")
let Cancel=()=>import("@/pages/cancel")
let Login=()=>import("@/pages/login")
let ChangePsw=()=>import("@/pages/changePsw")
let Log=()=>import("@/pages/log")

//不需要权限
const router = new Router({
    routes:[
        {
            name:Index,
            path:"/index",
            component:Index,
            redirect:"/home",
            children:[
                {
                    name:Home,
                    path:"/home",
                    component:Home
                },
        
                {
                    name:ChangePsw,
                    path:"/changePsw",
                    component:ChangePsw
                }
            ]
        },
        {
            name:Login,
            path:"/login",
            component:Login
        },
        {
            path:"/*",
            redirect:"/home"
        }    
    ]
})
export default router;

//权限路由
export const dynamicRouter = [
    {
            name:Index,
            path:"/index",
            component:Index,
            redirect:"/home",
            children:[
                {
                    name:Userlist,
                    path:"/userlist",
                    component:Userlist,
                    meta:{
                        roles:['管理员']
                    }
                },
                {
                    name:UserAdd,
                    path:"/useradd",
                    component:UserAdd,
                    meta:{
                        roles:['管理员']
                    }
                },
        
                {
                    name:Roomadd,
                    path:"/roomadd",
                    component:Roomadd,
                    meta:{
                        roles:['管理员']
                    }
                },
        
                {
                    name:Roomlist,
                    path:"/roomlist",
                    component:Roomlist,
                    meta:{
                        roles:['管理员']
                    }
                },
        
                {
                    name:Roomstate,
                    path:"/roomstate",
                    component:Roomstate,
                    meta:{
                        roles:['前台']
                    }
                },
        
                {
                    name:Booking,
                    path:"/booking",
                    component:Booking,
                    meta:{
                        roles:['前台']
                    }
                },
        
                {
                    name:Cancel,
                    path:"/cancel",
                    component:Cancel,
                    meta:{
                        roles:['前台']
                    }
                },
        
                {
                    name:Log,
                    path:"/log",
                    component:Log,
                    meta:{
                        roles:['前台']
                    }
                }
            ]
        }
]