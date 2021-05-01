import Router from "vue-router"
import HelloWorld from "@/components/HelloWorld";
import Vue from 'vue'
import Users from "@/components/Users";



Vue.use(Router)
const routes= [
    {
        path: "/hello",
        name: "hello",
        component: HelloWorld,
    },
    {
        path: '/',
        name: "home",
        component: Users,
    }
]


export default new Router({routes})