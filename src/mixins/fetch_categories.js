import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("categoryModule", ["getCategoryArticles", "getCategories"]),
    ...mapMutations(["setAlertMessage"]),
    ...mapMutations("categoryModule", [
      "setCategories",
      "setCategoryArticles",
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
    fetch_categories(fetch_params) {
      return new Promise((resolve, reject) => {
        this.getCategories(fetch_params)
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
            console.log(err);
            reject()
          });
      })
    },
    fetch_article_category(fetch_params) {
      return new Promise((resolve, reject) => {
        this.getCategoryArticles(fetch_params)
          .then(result => {
            console.log(result.status);
            switch (result.status) {
              case 200:
                resolve(result.data.articles)
                break;
              case 204:
                this.$swal.fire({
                  icon: "info",
                  title: this.$t("status.empty_list"),
                  showConfirmButton: false,
                  timer: 3000,
                  toast: true
                });
                // this.setAlertMessage({
                //   show: true,
                //   type: "info",
                //   message: this.$t("status.empty_list"),
                //   timeout: 3000
                // });
                reject()
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