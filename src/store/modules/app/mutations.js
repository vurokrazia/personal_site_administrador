export function setLanguage(state, language) {
  state.language = language
}
export function setURL(state, URL) {
  state.url = URL
}
export function setLoading(state, loading) {
  state.loading = loading
}
export function setTheme_On(state, theme) {
  state.theme_on = theme
}
export function setMessage(state, message) {
  state.message.color = message.color ? message.color : state.message.color
  state.message.timeout = message.timeout ? message.timeout : state.message.timeout
  state.message.snackbar = message.snackbar ? message.snackbar : state.message.snackbar
  state.message.message = message.message ? message.message : state.message.message
  state.message.confirm = message.confirm ? message.confirm : state.message.confirm
  //state.message.show = message.text != ""
}