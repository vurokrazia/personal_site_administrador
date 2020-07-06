import { user_key, logged_key, token_key } from "../../../env_files/var";
export function setUser(state, user) {
  if (user) {
    localStorage.setItem(token_key, JSON.stringify(user.token));
    //localStorage.setItem(user_key, JSON.stringify(user));
    state.user = user;
    state.logged = true;

  } else {
    state.user = null;
    state.logged = false;
    // localStorage.removeItem(user_key);
    localStorage.removeItem(token_key);
  }
}