import api from "../../../plugins/axios";

const url = "categories"

export async function createCategory({ commit }, resource) {
  return api(true).post(url, resource);
}

export async function updateCategory({ commit }, resource) {
  api().put(`${categories}/${resource.id}` , resource.form)
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
  let url_categories =  url
  if (data && data.page) url_categories += `?page=${data.page}`;
  return api().get(url_categories);
}

export async function getCategoryArticles(commit, data = {}) {
  let url_categories =  `${url}/${data.id}/articles`
  if (data.page) url_categories = `${url_categories}?page=${data.page}`;
  return api().get(url_categories);
}

export async function deleteCategory(commit,id) {
  return api().delete(`${url}/${id}`);
}