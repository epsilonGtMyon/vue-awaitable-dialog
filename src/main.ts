import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')


const ghPagePath = sessionStorage.getItem("ghPagePath");
if (ghPagePath) {
  sessionStorage.removeItem("ghPagePath");
  router.replace(ghPagePath.replace(import.meta.env.BASE_URL, "/"));
}

