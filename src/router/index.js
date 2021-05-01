import Router from "vue-router"
import Vue from 'vue'
import Home from "@/components/Home";
import AddSivu from "@/components/AddSivu";



Vue.use(Router)
const routes= [
    {
        path: "/Add",
        name: "Add",
        component: AddSivu,
    },
    {
        path: '/',
        name: "home",
        component: Home,
    }
]


export default new Router({routes})