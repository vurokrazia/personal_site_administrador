export default {
  home: {
    path: "/",
    title: "home",
    root: {
      title: "Inicio",
      path: "/",
      name: "home"
    },
    me: {
      title: "Sobre mi",
      path: "/me",
      name:"meAuth"
    }
  },
  users: {
    path: "/users",
    title: "Usuarios",
    login: {
      title: "Iniciar Sesión",
      path: "login",
      name: "loginAuth"
    },
    register: {
      title: "Registro",
      path: "register",
      name: "registroAuth"
    }
  },
  articles: {
    path: "/articles",
    title: "Artículos",
    index: {
      title: "Artículos",
      icon: "android",
      path: "index",
      name: "articlesIndex"
    },
    new: {
      title: "Registrar Artículo",
      icon: "android",
      path: "new",
      name: "articlesNew"
    },
    edit: {
      title: "Editar Artículo",
      icon: "android",
      path: "edit",
      name: "articlesEdit"
    },
    show: {
      title: "Ver Artículo",
      icon: "android",
      path: "show",
      name: "articlesShow"
    }
  },
};
