import Vuex from 'vuex'
import axios from 'axios'
const createStore = ()=>{
  return new Vuex.Store({
    state: {
      loadedPosts:[]
    },
    mutations:{
      setPosts(state, posts){
        state.loadedPosts = posts
      },
      addPost(state, post){
        state.loadedPosts.push(post)
      },
      editPost(state, editPost){
        const postIndex = state.loadedPosts.findIndex(post => post.id===editPost.id)
        state.loadedPosts[postIndex] = editPost;
      }
    },
    actions: {
      // 第一次執行時運行，只執行一次
      nuxtServerInit(vuexContext, context){
        return axios.get('https://nuxt-blog-35f4b-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
          .then(res=>{
            const postsArray = []
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key })
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch(e => context.error(e));
      },
      setPosts(vuexContext, posts){
        vuexContext.commit('setPosts', posts)
      },
      addPost(vuexContext, post){
        const createdData = {
          ...post, 
          updatedDate: new Date()
        }
        return axios.post('https://nuxt-blog-35f4b-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',createdData )
          .then(res => {
            vuexContext.commit('addPost', {...createdData, id:res.data.name});
          })
          .catch( e=> console.log(e))
      },
      editPost(vuexContext, editPost){
        return  axios.put('https://nuxt-blog-35f4b-default-rtdb.asia-southeast1.firebasedatabase.app/posts/'+
            editPost.id +
            '.json', editPost)
          .then( res =>{
            vuexContext.commit('editPost', editPost)
          })
          .catch( e => console.log(e))
      }
    },
    getters: {
      loadedPosts(state){
        return state.loadedPosts
      }
    }

  })
}

export default createStore