import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components/UI'
import './assets/tailwind.css'
import VueChartJs from 'vue-chartjs';
console.log(components)

createApp(App).use(store).use(router).mount('#app')
