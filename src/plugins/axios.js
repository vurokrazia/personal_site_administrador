import store from '../store/index';
import { url, user_key, logged_key, token_key } from "../env_files/var";
import axios from 'axios';

export default (multipart = false) => {
  return axios.create(
    {
      baseURL: url,
      withCredentials: false,
      headers: get_headers(multipart)
    }
  );
};

function get_headers(multipart) {
  var headers =
  {
    Authorization: `Bearer ${store.getters['authModule/token']}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  // if (multipart)
  //   headers['Content-Type'] = 'multipart/form-data'
  return headers
}