import { uniqBy, findIndex, remove } from "lodash";
export function setPage(state, page) {
  state.page = page;
}
export function setImages(state, data) {
  if (state.page === 1) {
    state.images = data;
  } else {
    state.images = uniqImage(state.images.concat(data))
  }
}
export function setImage(state, data) {
  state.images = uniqImage(state.images.concat(data))
}
function uniqImage(images) {
  return uniqBy(images, function (n) {
    return n.id;
  });
}