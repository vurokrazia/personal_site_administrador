import store from '../store/index';
import { user_key, logged_key, token_key } from "../mixins/var";
import {url}  from './enviroment_vars'
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
function get_token() {
  var token
  if (localStorage.getItem(user_key))
    token = JSON.parse(localStorage.getItem(user_key)).token
  return token
}
function get_headers(multipart) {
  let headers =
  {
    //Authorization: store.state.authModule.token ? `Bearer ${store.state.authModule.token}` : null,
    Authorization: `Bearer ${get_token()}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  return headers
}