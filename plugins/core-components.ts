import Vue from 'vue'

import PostList from '@/components/Posts/PostList.vue'
import AppButton from '@/components/UI/AppButton.vue'
import AppControlInput from '@/components/UI/AppControlInput.vue'
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
// FIXME 報錯
import zh_TW from 'vee-validate/dist/locale/zh_TW.json'

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
    // message: messages[rule] // assign message
  })
}
localize('en', zh_TW)

// Install components globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('AppButton', AppButton)
Vue.component('PostList', PostList)
Vue.component('AppControlInput', AppControlInput)
