import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("articleModule", ["getArticles", "updateArticle"]),
    ...mapMutations(["setAlertMessage"]),
    ...mapMutations("articleModule", [
      "setArticles",
      "setPage"
    ]),
    displayMessage(err) {
      var data = err.response.data;
      if (data.message)
        this.setAlertMessage({
          show: true,
          type: "error",
          message: data.message,
          timeout: 3000
        });
      else
        console.log(err);
    },
    fetch_articles(fetch_params) {
      return new Promise((resolve, reject) => {
        this.getArticles(fetch_params)
          .then(result => {
            switch (result.status) {
              case 200:
                resolve(result.data)
                break;
              case 204:
                this.$swal.fire({
                  icon: "info",
                  title: this.$t("status.empty_list"),
                  showConfirmButton: false,
                  timer: 3000,
                  toast: true
                });
                reject()
              default:
                reject()
                break;
            }
          })
          .catch(err => {
            this.displayMessage(err)
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