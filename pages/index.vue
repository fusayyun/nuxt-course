<template>
  <div class="home-page">
    <section class="intro">
      <h1>得到最新的消息！</h1>
    </section>
    <PostList :posts="loadedPosts" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import postsModule from '~/store/modules/PostsModule'
@Component
export default class extends Vue {
  get loadedPosts () {
    const MyModuleInstance = getModule(postsModule, this.$store)
    console.log('MyModuleInstance: ', MyModuleInstance)
    return MyModuleInstance.loadPosts
  }
}
</script>
<!--script>
export default {
  computed:{
    loadedPosts(){
      console.log(this.$store.getters.loadedPosts)
      return this.$store.getters.loadedPosts
    },
  },
  // data(){
  //   return{
  //     loadedPosts: []
  //   }
  // },
}
</script-->
<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/image/main-page-bg.jpg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>
