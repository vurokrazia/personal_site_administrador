import { isEmpty } from "lodash";
export function page(state) {
  return state.page
}
export function id(state) {
  return state.id
}
export function articles(state) {
  return state.articles
}
export function article(state) {
  return state.article
}
export function validate_article_body(state) {
  return state.validate_article_body
}
export function create_article(state) {
  return state.create_article
}
export function create_article_bodies(state){
  var article = {}
  article.id = state.article.id
return Object.assign(article, { article_bodies_attributes: state.article_bodies });
}
export function form_data_article(state) {
  let data_form = new FormData();
  for (var key in state.article) {
    if (key.includes("_attributes")) { 
      state.article[key].forEach(element => {
        data_form.append(`article[${key}][]`, element);
      });
    }

    data_form.append(`article[${key}]`, state.article[key]);
  }
  return data_form;
}


export function empty_article(state){
  return isEmpty(state.article)
}