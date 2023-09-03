// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

import colors from 'vuetify/lib/util/colors'

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.red.darken1, // #E53935

          color_btn_check: colors.green.darken1,
          color_btn_annuler: colors.red.accent4,

          color_catt: '#2E7D32', /* green-darken-3 */
          color_component: '#039be5' /* light-blue-darken-1  */,
        }
      },
    },
  },
})
