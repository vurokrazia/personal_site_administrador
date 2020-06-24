import { uniqBy, findIndex, remove } from "lodash";
export function setPage(state, page) {
  state.page = page;
}
export function setCategory(state, category) {
  state.category = { ...category };
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
  state.page++
}
export function setUpdateCategory(state, data) {
  var index = findIndex(state.categories, {
    id: data.id
  });
  if(index)
    state.categories.splice(index, 1, data);
}
export function removeCategory(state, item) {
  state.category = remove(state.category, function (n) {
    return n.id != item.id;
  });
}