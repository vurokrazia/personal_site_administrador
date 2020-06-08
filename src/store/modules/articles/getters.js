export function start(state) {
  return state.start
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
export function form_data_article(state) {
  let data_form = new FormData();
  for (var key in state.article) {
    if (key.includes("_attributes")) { 
      state.article[key].forEach(element => {
        console.log(element);
        data_form.append(`article[${key}][]`, element);
      });
    }

    data_form.append(`article[${key}]`, state.article[key]);
    console.log(`article[${key}]`, state.article[key]);
  }
  return data_form;
}