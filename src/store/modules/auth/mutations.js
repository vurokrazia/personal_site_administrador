import { user_key, logged_key, token_key } from "../../../env_files/var";
export function setUser(state, user) {
  if (user) {
    state.user = user;
    state.logged = true;
    localStorage.setItem(user_key, JSON.stringify(user));
  } else {
    state.user = null;
    state.logged = false;
    localStorage.removeItem(user_key);
  }
}