import Vue from 'vue'
import Router from 'vue-router'

import Login from "@/components/Login";
import Register from "@/components/Register";
import Home from "@/components/Home";
import Layout from "@/layout/Layout";
import StudentInfo from "@/layout/components/info/StudentInfo";
import DormInfo from "@/layout/components/info/DormInfo";
import UserInfo from "@/layout/components/info/UserInfo";
import AssignDorm from "@/layout/components/info/AssignDorm";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/admin',
                    name: 'Layout',
                    component: Layout,
                    children: [
                        {
                            path: 'student',
                            name: 'StudentInfo',
                            component: StudentInfo
                        },
                        {
                            path: 'dorm',
                            name: 'DormInfo',
                            component: DormInfo
                        },
                        {
                            path: 'user',
                            name: 'UserInfo',
                            component: UserInfo
                        },
                        {
                            path: 'assign',
                            name: 'AssignDorm',
                            component: AssignDorm
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})

