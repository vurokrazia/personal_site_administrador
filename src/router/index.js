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

import CategoriesView from '../views/Category'
import Index_Category from '../components/categories/index'
import New_Category from '../components/categories/new'
import Edit_Category from '../components/categories/edit'
import Show_Category from '../components/categories/show'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index_Article,
    meta: {
      title: "Welcome"
    }
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
          title: name_routes.articles.new.title,
          permission_level: 1
        },
        beforeEnter: (to, from, next) => beforeEnterValidatePermissions(to, from, next),
      },
      {
        path: name_routes.articles.edit.path,
        component: Edit_Article,
        name: name_routes.articles.edit.name,
        meta: {
          title: name_routes.articles.edit.title,
          permission_level: 1
        },
        beforeEnter: (to, from, next) => beforeEnterValidatePermissions(to, from, next),
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
  {
    path: name_routes.categories.path,
    component: CategoriesView,
    meta: {
      title: name_routes.categories.title
    },
    children: [
      {
        path: name_routes.categories.new.path,
        component: New_Category,
        name: name_routes.categories.new.name,
        meta: {
          title: name_routes.categories.new.title,
          permission_level: 1
        },
        beforeEnter: (to, from, next) => beforeEnterValidatePermissions(to, from, next),
      },
      {
        path: name_routes.categories.edit.path,
        component: Edit_Category,
        name: name_routes.categories.edit.name,
        meta: {
          title: name_routes.categories.edit.title,
          permission_level: 1
        },
        beforeEnter: (to, from, next) => beforeEnterValidatePermissions(to, from, next),
      },
      {
        path: name_routes.categories.index.path,
        component: Index_Category,
        name: name_routes.categories.index.name,
        meta: {
          title: name_routes.categories.index.title
        }
      },
      {
        path: name_routes.categories.show.path,
        component: Show_Category,
        name: name_routes.categories.show.name,
        meta: {
          title: name_routes.categories.show.title
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
  }
  next();
};


const beforeEnterValidatePermissions = (to, from, next) => {
  var user = store.state.authModule.user
  if (user) {
    let permission_level = user.permission_level
    if (permission_level != to.meta.permission_level)
      next({
        path: "/"
      });
    else {
      next();
    }
  } else {
    next({
      path: "/"
    });
  }
};

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  if (document.title == name_routes.articles.show.title)
    document.title = store.getters['articleModule/article'].title
  else if (document.title == name_routes.categories.show.title)
    document.title = store.getters['categoryModule/category'].name
  next();
});

export default router
