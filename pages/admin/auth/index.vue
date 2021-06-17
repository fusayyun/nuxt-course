<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onSubmitted">
        <AppControlInput v-model="email" type="email">
          E-Mail Address
        </AppControlInput>
        <AppControlInput v-model="password" type="password">
          Password
        </AppControlInput>
        <AppButton type="submit">
          {{ isLogin ? 'Login' : 'Sign Up' }}
        </AppButton>
        <AppButton
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin"
        >
          Switch to {{ isLogin ? 'Signup' : 'Login' }}
        </AppButton>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Auth } from '@/interfaces/post'
import postsModule from '~/store/modules/PostsModule'
@Component({
  layout: 'admin'
})
export default class extends Vue implements Auth {
  isLogin= true;
  email= '';
  password= '';

  /** 處理送出事件 */
  async onSubmitted () {
    await postsModule.authenticateUser({
      isLogin: this.isLogin,
      email: this.email,
      password: this.password
    })
    this.$router.push('/admin')
  }
}
</script>
<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
}
</style>
