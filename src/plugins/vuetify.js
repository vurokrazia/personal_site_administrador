import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: colors.blueGrey,
        secondary: colors.blueGrey.lighten1,
        accent: '#82B1FF',
        error: '#FF5252',
        danger: '#C07128',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
      dark: {
        primary: colors.deepPurple,
        secondary: colors.deepPurple.lighten1,
        accent: '#82B1FF',
        error: '#FF5252',
        danger: '#C07128',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
  lang: {
    locales: { es },
    current: 'es',
  },
});
