import api from "../../../plugins/axios";
export async function createArticle({ commit }, resource) {
  return api(true).post("articles", resource);
}
export async function updateArticle({ commit }, resource) {
  return api(true).put(`articles/${resource.id}`, resource.form);
}
export async function updateArticleBody({ commit }, resource) {
  api().put(`articles/${resource.id}`, resource.form)
    .then((result) => {
      commit('setArticle', result.data)
    }).catch((err) => {
      console.log(err);
    });

}
export async function getArticle({ commit }, resource) {
  return api().get(`articles/${resource.id}`);
}
export async function getArticles(commit, data) {
  let url = `articles`;
  if (data.page) url += `?page=${data.page}`;
  if (data.category_id) url += `&category_id=${data.category_id}`;
  return api().get(url);
}
export async function deleteArticle(commit, id) {
  return api().delete(`articles/${id}`);
}
export async function addPicture({
  commit
}, resource) {
  return api().post(`articles/${resource.experience.id}/image`, resource)
}
export async function destroyEPicture({
  commit
}, resource) {
  return api().delete(`articles/${resource.experience_id}/display?image_id=${resource.id}`)
}