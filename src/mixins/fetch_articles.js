import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("articleModule", ["getArticles","updateArticle"]),
    ...mapMutations(["setAlertMessage"]),
    ...mapMutations("articleModule", [
      "setArticles",
      "setPage"
    ]),
    displayMessage(message, color) {
      alert(message)
      this.setAlertMessage({
        color: color,
        timeout: 3000,
        snackbar: "0123456789",
        text: message,
        confirm: false
      });
    },
    proxy_params(params) {
      console.log("proxy_params",params);
      if (params.page && params.page == 1) {
        this.setPage(params.page)
        this.setArticles([])
      }
    },
    fetch_article(fetch_params) {
      this.proxy_params(fetch_params)
      return new Promise((resolve, reject) => {
        this.getArticles(fetch_params)
          .then(result => {
            switch (result.status) {
              case 200:
                resolve(result.data)
                break;
              case 204:
                this.setAlertMessage({
                  show: true,
                  type: "info",
                  message: this.$t("status.empty_list"),
                  timeout: 3000
                });
                resolve([])
              default:
                reject()
                break;
            }
          })
          .catch(err => {
            console.log(err);
            reject()
          });
      })
    },
    fetch_update_article(fetch_params) {
      return new Promise((resolve, reject) => {
        this.updateArticle(fetch_params)
          .then(result => {
            switch (result.status) {
              case 200:
                resolve(result.data)
                break;
              case 204:
                this.setAlertMessage({
                  show: true,
                  type: "info",
                  message: this.$t("status.empty_list"),
                  timeout: 3000
                });
                resolve({})
              default:
                reject()
                break;
            }
          })
          .catch(err => {
            console.log(err);
            reject()
          });
      })
    }
  }
};