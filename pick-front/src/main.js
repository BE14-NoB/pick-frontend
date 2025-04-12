import { createApp } from 'vue';
import App from './App.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import DayJsAdapter from '@date-io/dayjs'

// MDI 아이콘 설정
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Vue Router import
import router from './router/router.js';

// Vuetify 인스턴스 생성
const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
    date: {
      adapter: DayJsAdapter,
    }
  })

const app = createApp(App);
app.use(vuetify);  // vuetify 사용
app.use(router);
app.mount('#app');

