import api from "../../../plugins/axios";
export async function createCategory({ commit }, resource) {
  return api(true).post("categories", resource);
}
export async function updateCategory({ commit }, resource) {
  api().put(`categories/${resource.id}` , resource.form)
  .then((result) => {
    commit('setCategory', result.data)
    commit('setUpdateCategory', result.data)
  }).catch((err) => {
    console.log(err);
  });
  
}
export async function getCategory({ commit }, resource) {
  return api().get(`categories/${resource.id}`);
}
export async function getCategories(commit, data) {
  let url = `categories`;
  if (data && data.page) url += `?page=${data.page}`;
  return api().get(url);
}
export async function deleteCategory(commit,id) {
  return api().delete(`categories/${id}`);
}