import Vue from 'vue'
import Router from 'vue-router'

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
export default new Router({
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
                    name:Userlist,
                    path:"/userlist",
                    component:Userlist
                },
                {
                    name:UserAdd,
                    path:"/useradd",
                    component:UserAdd
                },
        
                {
                    name:Roomadd,
                    path:"/roomadd",
                    component:Roomadd
                },
        
                {
                    name:Roomlist,
                    path:"/roomlist",
                    component:Roomlist
                },
        
                {
                    name:Roomstate,
                    path:"/roomstate",
                    component:Roomstate
                },
        
                {
                    name:Booking,
                    path:"/booking",
                    component:Booking
                },
        
                {
                    name:Cancel,
                    path:"/cancel",
                    component:Cancel
                },
        
                {
                    name:ChangePsw,
                    path:"/changePsw",
                    component:ChangePsw
                },
        
                {
                    name:Log,
                    path:"/log",
                    component:Log
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