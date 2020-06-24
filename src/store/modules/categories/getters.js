import { isEmpty } from "lodash";
export function page(state) {
  return state.page
}
export function categories(state) {
  return state.categories
}
export function category(state) {
  return state.category
}
export function form_data_category(state) {
  let data_form = new FormData();
  for (var key in state.category) {
    data_form.append(`categories[${key}]`, state.category[key]);
  }
  return data_form;
}
export function empty_category(state){
  return isEmpty(state.category)
}