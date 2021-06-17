import { IncomingMessage } from 'http'
import { store } from '@/store'
import { Mutation, Action, VuexModule, Module, config, getModule } from 'vuex-module-decorators'
import Cookie from 'js-cookie'
import { Post, Auth, PostEdited, PostCreated } from '~/interfaces/post'
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
  async addPost (post:PostEdited) {
    try {
      const createdData: PostCreated = {
        ...post,
        updatedDate: new Date()
      }
      const data = await $axios.$post('/posts.json?auth=' + this.token, createdData)
      this.ADD_POST({ ...createdData, id: data.name })
    } catch (error) {
      console.log(error)
    }
  };

  /** 編輯文章 */
  @Action
  async editPost (editPost:Post) {
    try {
      await $axios.$put('/posts/' + editPost.id + '.json?auth=' + this.token, editPost)
      this.EDIT_POST(editPost)
    } catch (error) {
      console.log(error)
    }
  }

  /** 驗證使用者 */
  @Action({ rawError: true })
  async authenticateUser (authData:Auth) {
    try {
      /** 登入 或 註冊 */
      let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          process.env.fbAPIKey
      if (!authData.isLogin) { // 註冊
        authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            process.env.fbAPIKey
      }
      const result = await $axios.$post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      this.SET_TOKEN(result.idToken)
      Cookie.set('jwt', result.idToken)
      Cookie.set(
        'expirationDate',
        (new Date().getTime() + Number.parseInt(result.expiresIn) * 1000).toString()
      )
    } catch (error) {
      console.log(error)
    }
  }

  /** 重整後重新獲取token */
  @Action
  public initAuth (req: IncomingMessage) {
    let token:string|undefined, expirationDate:string|undefined
    if (req) { // 如果是重整
      if (!req.headers.cookie) { // 如果沒有找到cookies
        return
      }
      const jwtCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('jwt='))
      if (!jwtCookie) {
        return
      }
      token = jwtCookie.split('=')[1]
      // 如何解決:'TS2532: Object is possibly 'undefined'?
      expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate='))?.split('=')[1]
    } else { // 頁面切換
      token = Cookie.get('jwt')
      expirationDate = Cookie.get('expirationDate')
    }

    if (!expirationDate || new Date().getTime() > +expirationDate || !token) { // 如果過期了或是沒有token => 自動登出
      console.log('no token or invalid token')
      this.logout()
    } else { // => 儲存token到state裡
      this.SET_TOKEN(token)
    }
  }

  /** 登出 */
  @Action
  public logout () {
    this.CLEAR_TOKEN()
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')
  }

  get loadPosts () {
    return this.loadedPosts
  }

  get isAuthenticated () {
    return this.token != null
  }
}
export default getModule(PostsModule)
