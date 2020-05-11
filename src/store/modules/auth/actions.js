import api from "../../../plugins/axios";
export async function loginUser({ commit }, user) {
  return api().post("sessions", user);
}
export async function registerUser({ commit }, user) {
  return api().post("users", user);
}