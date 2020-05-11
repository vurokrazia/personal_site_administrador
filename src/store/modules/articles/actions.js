import api from "../../../plugins/axios";
export async function createArticle({ commit }, resource) {
  return api().post("articles", resource);
}
export async function updateArticle({ commit }, resource) {
  return api().put("articles/" + resource.experience.id, resource);
}
export async function getArticles(commit, data) {
  let url = `articles`;
  if (data && data.briefcase) url += `?briefcase=${data.briefcase}`;
  return api().get(url);
}
export async function deleteArticle(commit,id) {
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