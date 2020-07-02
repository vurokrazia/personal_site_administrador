import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("categoryModule", ["getCategoryArticles","getCategories"]),
    ...mapMutations(["setAlertMessage"]),
    ...mapMutations("categoryModule", [
      "setCategories",
      "setCategoryArticles",
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
      if (params.page && params.page == 1) {
        this.setPage(params.page)
        this.setCategoryArticles([])
      }
    },
    fetch_categories(fetch_params) {
      //this.proxy_params(fetch_params)
      return new Promise((resolve, reject) => {
        this.getCategories(fetch_params)
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
    fetch_article_category(fetch_params) {
      // this.proxy_params(fetch_params)
      return new Promise((resolve, reject) => {
        this.getCategoryArticles(fetch_params)
          .then(result => {
            console.log("getCategoryArticles",result.data);
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
    }
  }
};