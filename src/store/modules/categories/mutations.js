import { uniqBy, findIndex, remove } from "lodash";
export function setPage(state, page) {
  state.page = page;
}
export function setCategoryArticles(state, data) {
  if (state.page === 1) {
    state.category.articles = data;
  } else {
    let articles = state.category.articles.concat(data);
    state.category.articles = uniqBy(articles, function (n) {
      return n.id;
    });
  }
  if (data.length != 0)
    state.page++
}
export function setCategory(state, category) {
  state.category = { ...category };
  state.category.articles = []
}
export function setCategories(state, data) {
  if (state.page === 1) {
    state.categories = data;
  } else {
    let categories = state.categories.concat(data);
    state.categories = uniqBy(categories, function (n) {
      return n.id;
    });
  }
  if (data.length != 0)
    state.page++
}
export function setUpdateCategory(state, data) {
  var index = findIndex(state.categories, {
    id: data.id
  });
  if (index)
    state.categories.splice(index, 1, data);
}
export function removeCategory(state, item) {
  state.category = remove(state.category, function (n) {
    return n.id != item.id;
  });
}