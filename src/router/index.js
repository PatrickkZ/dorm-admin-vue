import Vue from 'vue'
import Router from 'vue-router'

import Login from "@/components/Login";
import Register from "@/components/Register";
import Home from "@/components/Home";
import Layout from "@/layout/Layout";
import StudentInfo from "@/layout/components/info/StudentInfo";
import DormInfo from "@/layout/components/info/DormInfo";
import UserInfo from "@/layout/components/info/UserInfo";
// import AssignDorm from "@/layout/components/info/AssignDorm";
import DormOperation from "@/layout/components/info/DormOperation";
import DormStatistic from "@/layout/components/info/DormStatistic";
import Welcome from "@/layout/components/info/Welcome";

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
                    meta: {
                        requireAuth: true
                    },
                    children: [
                        {
                            path: 'student',
                            name: 'StudentInfo',
                            component: StudentInfo,
                            meta: {
                                requireAuth: true
                            },
                        },
                        {
                            path: 'dorm',
                            name: 'DormInfo',
                            component: DormInfo,
                            meta: {
                                requireAuth: true
                            },
                        },
                        {
                            path: 'user',
                            name: 'UserInfo',
                            component: UserInfo,
                            meta: {
                                requireAuth: true
                            },
                        },
                        {
                            path: 'dorm-operation',
                            name: 'DormOperation',
                            component: DormOperation,
                            meta: {
                                requireAuth: true
                            },
                        },
                        {
                            path: 'dorm-statistic',
                            name: 'DormStatistic',
                            component: DormStatistic,
                            meta: {
                                requireAuth: true
                            },
                        },
                        {
                            path: 'welcome',
                            name: 'Welcome',
                            component: Welcome,
                            meta: {
                                requireAuth: true
                            },
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

