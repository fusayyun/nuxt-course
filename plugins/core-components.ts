import Vue from "vue";
import PostList from "@/components/Posts/PostList.vue";
import AppButton from "@/components/UI/AppButton.vue";
import AppControlInput from "@/components/UI/AppControlInput.vue";
import AppDropdown from "@/components/UI/AppDropdown.vue";
import AppModal from "@/components/UI/AppModal.vue";

// Install components globally

Vue.component("AppButton", AppButton);
Vue.component("PostList", PostList);
Vue.component("AppControlInput", AppControlInput);
Vue.component("AppDropdown", AppDropdown);
Vue.component("AppModal", AppModal);
