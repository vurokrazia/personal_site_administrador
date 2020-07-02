import { uniqBy, findIndex, remove } from "lodash";
export function setPage(state, page) {
  state.page = page;
}
export function setArticle(state, article) {
  if( article == null)
    {
      state.article_bodies = []
    }
  state.article = {...article};
}
export function setArticles(state, data) {
  console.log("setArticles",data, state.page);
  if (state.page === 1) {
    state.articles = data;
  } else {
    let articles = state.articles.concat(data);
    state.articles = uniqBy(articles, function (n) {
      return n.id;
    });
  }
  state.page++
}
export function setUpdateArticle(state, data) {
  var index = findIndex(state.articles, {
    id: data.id
  });
  state.articles.splice(index, 1, data);
}
export function removeArticle(state, item) {
  state.articles = remove(state.articles, function (n) {
    return n.id != item.id;
  });
}
export function setCancelValidate(state,item){
  state.validate_article_body = item
}
export function setValidateArticleBody(state, item) {
  // console.log("state setValidateArticleBody", item);
  state.article_bodies = []
  state.validate_article_body = item.validate_article_body
  state.article_bodies_length = item.article_bodies_length
  state.create_article = false
}
export function setArticleBody(state, item) {
  state.article_bodies.push(item)
  // console.log("setArticleBody", state.article_bodies.length, state.article_bodies_length, state.article_bodies.length == state.article_bodies_length);
  if (state.article_bodies.length == state.article_bodies_length) {
    // console.log("a revisar si valido :(");
    let array = []
    state.article_bodies.forEach(item => {
      if (item.correct)
        array.push(item.resource)
    });
    if (array.length == state.article_bodies_length) {
      //state.article.article_bodies = array 
      // Object.assign(state.article, { article_bodies_attributes: array });
      state.article_bodies = array
      state.create_article = true
      setTimeout(() => {
        state.validate_article_body = false
        state.create_article = false
      }, 500);
    }
    else {
      // console.log("Errors D:");
      state.validate_article_body = false
    }
  }
}
export function setCreateArticle(state, create) {
  state.create_article = create
}