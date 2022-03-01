import Router from "vue-router"
import Vue from 'vue'
import Home from "@/components/Home";
import AddSivu from "@/components/AddSivu";
import recipe from "@/components/recipe";
import update from "@/components/update";
import login from "@/components/login"


Vue.use(Router)
const routes= [
    {
        path: "/Add",
        name: "Add",
        component: AddSivu,
    },
    {
      path: "/login",
      name: "login",
      component: login,
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
    },
    {
        path: '/update',
        name: "update",
        component: update,
    }
]


export default new Router({routes})