import store from '../store/index';
import axios from 'axios';
export default (multipart = false) => {
  console.log(multipart);
  return axios.create(
    {
      baseURL: process.env.NODE_ENV == 'production' ? 'https://backend.vurokrazia.com/api/v1/' : 'http://localhost:3000/api/v1/',
      withCredentials: false,
      headers: get_headers(multipart)
    }
  );
};
function get_token() {
  var token
  if (localStorage.getItem('development_user'))
    token = JSON.parse(localStorage.getItem('development_user')).token
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