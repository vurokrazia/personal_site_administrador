import store from '../store';
import axios from 'axios';
export default () => {
  return axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? 'http://codigovurokrazia.com:3000/api/v1/' : 'http://localhost:3000/api/v1/',
    withCredentials: false,
    headers: {
      //token: store.state.authModule.token ? store.state.authModule.token.token : null,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}; 