import Vue from 'vue'
import VueStorage from 'vue-ls'

import defaultSetting from '@/config/defaultSetting'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(VueStorage, defaultSetting.storageOptions)
Vue.use(ViewUI)
