import Router from "vue-router"
import Vue from 'vue'
import Home from "@/components/Home";
import AddSivu from "@/components/AddSivu";
import recipe from "@/components/recipe";


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
    },
    {
        path: '/recipe',
        name: "recipe",
        component: recipe,
    }
]


export default new Router({routes})