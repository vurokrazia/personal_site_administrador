import { uniqBy, findIndex, remove } from "lodash";
export function setStart(state, start) {
  state.start = start;
}
export function setArticle(state, article) {
  state.article = article;
}
export function setArticles(state, data) {
  if (state.start === 1) {
    state.articles = data;
  } else {
    let articles = state.articles.concat(data);
    state.articles = uniqBy(articles, function(n) {
      return n.id;
    });
  }
}
export function setUpdateArticle(state, data) {
  var index = findIndex(state.articles, {
    id: data.id
  });
  state.articles.splice(index, 1, data);
}
export function removeArticle(state, item) {
  state.articles = remove(state.articles, function(n) {
    return n.id != item.id;
  });
}
export function setValidateArticleBody(state,item){
  if(item.index == -1)
    state.validate_article_body.objects  = []
  state.validate_article_body.next = item.next
  if(!(JSON.stringify(item.object) === JSON.stringify({})))
    state.validate_article_body.objects.push(item.object)
    state.validate_article_body.index = item.index + 1
}