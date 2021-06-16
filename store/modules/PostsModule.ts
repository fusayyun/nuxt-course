import { IncomingMessage } from 'http'
import { store } from '@/store'
import { Mutation, Action, VuexModule, Module, config, getModule } from 'vuex-module-decorators'
import Cookie from 'js-cookie'
import { Post, Auth } from '~/interfaces/post'
import { $axios } from '~/utils/api'
// Set rawError to true by default on all @Action decorators
config.rawError = true
@Module({ dynamic: true, name: 'PostsModule', store, namespaced: true/*, stateFactory: true  */ })
class PostsModule extends VuexModule {
  /** state */
  loadedPosts:Post[] = [];
  token: string | null = null;

  @Mutation
  private SET_POSTS (posts: Post[]) {
    this.loadedPosts = posts
  };

  /** 新增文章 */
  @Mutation
  private ADD_POST (post: Post) {
    this.loadedPosts.push(post)
  };

  /** 編輯文章 */
  @Mutation
  private EDIT_POST (editPost: Post) {
    const postIndex = this.loadedPosts.findIndex(post => post.id === editPost.id)
    this.loadedPosts[postIndex] = editPost
  };

  @Mutation
  private SET_TOKEN (token:string) {
    this.token = token
  }

  /** 清除token */
  @Mutation
  private CLEAR_TOKEN () {
    this.token = null
  }

  @Action
  public setPosts (posts:Post[]) {
    this.SET_POSTS(posts)
  };

  @Action
  async addPost (post:Pick<Post, 'author' | 'title'| 'thumbnail'| 'content' | 'previewText'>) {
    const createdData: Pick<Post, 'author' | 'title'| 'thumbnail'| 'content' | 'previewText'|'updatedDate'> = {
      ...post,
      updatedDate: new Date()
    }
    return await $axios.$post('/posts.json?auth=' +
      this.token, createdData)
      .then((data) => {
        this.ADD_POST({ ...createdData, id: data.name })
      })
      .catch((e: Error) => console.log(e))
  };

  /** 編輯文章 */
  @Action
  async editPost (editPost:Post) {
    return await $axios.$put('/posts/' +
        editPost.id +
        '.json?auth=' +
        this.token, editPost)
      .then(() => {
        this.EDIT_POST(editPost)
      })
      .catch((e:Error) => console.log(e))
  }

  /** 驗證使用者 */
  @Action({ rawError: true })
  async authenticateUser (authData:Auth) {
    let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        process.env.fbAPIKey
    if (!authData.isLogin) {
      authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          process.env.fbAPIKey
    }
    return await $axios
      .$post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }
      ).then((result) => {
        this.SET_TOKEN(result.idToken)
        console.log(this)
        localStorage.setItem('token', result.idToken) // 儲存token到localStorage
        localStorage.setItem(
          'tokenExpiration',
          (new Date().getTime() + Number.parseInt(result.expiresIn) * 1000).toString()
        )
        Cookie.set('jwt', result.idToken)
        Cookie.set(
          'expirationDate',
          (new Date().getTime() + Number.parseInt(result.expiresIn) * 1000).toString()
        )
        // return $axios.$post('http://localhost:3000/api/track-data', { data: 'Authenticated!' })
      })
      .catch(e => console.log(e))
  }

  /** 重整後重新獲取token */
  @Action
  public initAuth (req: IncomingMessage) {
    let token, expirationDate
    console.log('req', req)
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
      // 如何解決:'TS2532: Object is possibly 'undefined'
      expirationDate = req?.headers?.cookie?.split(';')?.find(c => c.trim().startsWith('expirationDate='))?.split('=')[1]
    } else { // 如果在client端
      token = localStorage.getItem('token')
      expirationDate = localStorage.getItem('tokenExpiration')
    }
    // 如果過期了或是沒有token，自動登出
    if (!expirationDate || new Date().getTime() > +expirationDate || !token) {
      console.log('no token or invalid token')
      this.logout()
    } else {
    // 儲存token到state裡
      this.SET_TOKEN(token)
    }
  }

  /** 登出 */
  @Action
  public logout () {
    this.CLEAR_TOKEN()
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')
    if (process.client) { // 如果目前在client端
      localStorage.removeItem('tokenExpiration')
      localStorage.removeItem('token')
    }
  }

  get loadPosts () {
    console.log('log post:', this.loadedPosts)
    return this.loadedPosts
  }

  get isAuthenticated () {
    return this.token != null
  }
}
export default getModule(PostsModule)
