import Vuex from 'vuex'
import Cookie from 'js-cookie'
const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts (state, posts) {
        state.loadedPosts = posts
      },
      addPost (state, post) {
        state.loadedPosts.push(post)
      },
      editPost (state, editPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editPost.id)
        state.loadedPosts[postIndex] = editPost
      },
      setToken (state, token) {
        state.token = token
      },
      clearToken (state) {
        state.token = null
      }
    },
    actions: {
      // 第一次執行時運行，只執行一次
      nuxtServerInit (vuexContext, context) {
        return context.app.$axios
          .$get('/posts.json')
          .then((data) => {
            const postsArray = []
            for (const key in data) {
              postsArray.push({ ...data[key], id: key })
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch(e => context.error(e))
      },
      setPosts (vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      addPost (vuexContext, post) {
        const createdData = {
          ...post,
          updatedDate: new Date()
        }
        return this.$axios.$post('/posts.json?auth=' +
          vuexContext.state.token, createdData)
          .then((data) => {
            vuexContext.commit('addPost', { ...createdData, id: data.name })
          })
          .catch(e => console.log(e))
      },
      editPost (vuexContext, editPost) {
        return this.$axios.$put('/posts/' +
            editPost.id +
            '.json?auth=' +
            vuexContext.state.token, editPost)
          .then(() => {
            vuexContext.commit('editPost', editPost)
          })
          .catch(e => console.log(e))
      },
      // 註冊或登入請求
      authenticateUser (vuexContext, authData) {
        let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            process.env.fbAPIKey
        if (!authData.isLogin) {
          authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              process.env.fbAPIKey
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
          ).then((result) => {
            vuexContext.commit('setToken', result.idToken)
            localStorage.setItem('token', result.idToken) // 儲存token到localStorage
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            )
            Cookie.set('jwt', result.idToken)
            Cookie.set(
              'expirationDate',
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            )
            return this.$axios.$post('http://localhost:3000/api/track-data', { data: 'Authenticated!' })
          })
          .catch(e => console.log(e))
      },
      // 重整後重新獲取token
      initAuth (vuexContext, req) {
        let token, expirationDate
        if (req) { // 如果在server端
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else { // 如果在client端
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }

        // 如果過期了或是沒有token，自動登出
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('no token or invalid token')
          vuexContext.dispatch('logout')
          return
        }

        // 儲存token到state裡
        vuexContext.commit('setToken', token)
      },
      // 登出，清除token
      logout (vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) { // 如果目前在client端
          localStorage.removeItem('tokenExpiration')
          localStorage.removeItem('token')
        }
      }
    },
    getters: {
      loadedPosts (state) {
        return state.loadedPosts
      },
      isAuthenticated (state) {
        return state.token != null
      }
    }

  })
}

export default createStore
