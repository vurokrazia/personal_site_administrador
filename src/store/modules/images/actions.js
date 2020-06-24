import api from "../../../plugins/axios";
var url = `multimedium`;
export async function getImages(commit, data) {
  console.log(data);
  if (data && data.page) url = `${url}?page=${data.page}`;
  if (data && data.per_page) url = `${url}&per_page=${data.per_page}`;
  return api().get(url);
}