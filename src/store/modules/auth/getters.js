import { token_key } from "../../../env_files/var";
function localstorage_token() {
  let token = localStorage.getItem(token_key)
  if (token) {
    return JSON.parse(token)
  }
  return null
}
export function logged(state) {
  return state.logged;
}

export function token(state) {
  return state.user ? state.user.token : localstorage_token();
}

export function user(state) {
  return state.user;
}

export function is_administrator(state) {
  return state.user ? state.user.permission_level == 1 : false;
}
