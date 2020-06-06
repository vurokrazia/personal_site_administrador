import Vue from 'vue'
import VueRouter from 'vue-router'
import name_routes from "../i18n/routes";
import store from "../store";

import Home from '../views/Home.vue'

import UsersView from "../views/Auth";
import RegisterUsers from "../components/auth/register";
import LoginUsers from "../components/auth/login";


import ArticlesView from '../views/Article' 

import Index_Article from '../components/articles/index'
import New_Article from '../components/articles/new'
import Edit_Article from '../components/articles/edit'
import Show_Article from '../components/articles/show'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: name_routes.users.path,
    component: UsersView,
    meta: {
      title: name_routes.users.title
    },
    beforeEnter: (to, from, next) => beforeEnter(to, from, next),
    children: [
      {
        path: name_routes.users.login.path,
        component: LoginUsers,
        name: name_routes.users.login.name,
        meta: {
          title: name_routes.users.login.title
        }
      },
      {
        path: name_routes.users.register.path,
        component: RegisterUsers,
        name: name_routes.users.register.name,
        meta: {
          title: name_routes.users.register.title
        }
      }
    ]
  },
  {
    path: name_routes.articles.path,
    component: ArticlesView,
    meta: {
      title: name_routes.articles.title
    },
    children: [
      {
        path: name_routes.articles.new.path,
        component: New_Article,
        name: name_routes.articles.new.name,
        meta: {
          title: name_routes.articles.new.title
        }
      },
      {
        path: name_routes.articles.edit.path,
        component: Edit_Article,
        name: name_routes.articles.edit.name,
        meta: {
          title: name_routes.articles.edit.title
        }
      },
      {
        path: name_routes.articles.index.path,
        component: Index_Article,
        name: name_routes.articles.index.name,
        meta: {
          title: name_routes.articles.index.title
        }
      },
      {
        path: name_routes.articles.show.path,
        component: Show_Article,
        name: name_routes.articles.show.name,
        meta: {
          title: name_routes.articles.show.title
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const beforeEnter = (to, from, next) => {
  if (store.state.authModule.logged) {
    next({
      path: "/"
    });
  } else {
    next();
  }
};
export default router
