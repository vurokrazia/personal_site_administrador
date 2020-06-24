import moment from "moment";
moment.locale("es");
export default {
  methods: {
    getDateNow() {
      var today = new Date();
      var dd = today.getDate();

      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      return yyyy + "-" + mm + "-" + dd;
    },
    packageformatConsult(str) {
      /*
      var date = moment().subtract(5, 'hours');
      var minute = date.minutes();
      alert(date.subtract(minute, 'minutes').format('YYYY-MM-DDTHH:mm'))
      */
      return moment(str).format("YYYY-MM-DD HH:mm");
    },
    formatIso(str) {
      return moment(str)
        .utc()
        .format("DD-MM-YYYY");
    },
    formatGeneralDay(str) {
      //26 de abril de 2020
      var temp_day = moment(str).utc().format("YYYY-MM-DD")
      var day = moment(str).utc().format("DD");
      var d = new Date(temp_day);
      var dayName = this.$t('words.days')[d.getDay()];
      var monthNames = this.$t('words.months')[d.getMonth()]
      return `${dayName} ${day} ${monthNames} ${d.getFullYear()}`;
    },
    packageformatIso(str) {
      return (
        moment(str).format("HH:mm") + " del " + moment(str).format("DD-MM-YYYY")
      );
    },
    formatIsoDMYHM(str) {
      var date = moment(str);
      var dateComponent =
        date.format("DD-MM-YYYY") + " a las " + date.format("HH:mm"); //'HH:mm:ss DD-MM-YYYY'
      return dateComponent;
    }
  }
};
