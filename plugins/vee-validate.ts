import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/zh_TW.json";

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
    message: (messages as { [key: string]: string })[rule] // assign message
  });
}

/** 圖片網址驗證 */
extend("imageUrl", {
  validate: value => {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*).(jpg|gif|png)/;
    const regex = new RegExp(expression);
    return value.match(regex);
  },
  message: "此網址非圖片網址"
});

/** 密碼驗證 */
extend("regex", {
  ...rules.regex,
  message: "密碼至少要6個字元以上，且不包含不符字元"
});

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
