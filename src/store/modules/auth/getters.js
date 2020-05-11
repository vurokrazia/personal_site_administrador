export function logged(state) {
  return state.logged;
}
export function token(state) {
  return state.user ? state.user.token : null;
}
export function user(state) {
  return state.user;
}
export function is_administrator(state) {
  return state.user ? state.user.permission_level == 1 : false;
}
