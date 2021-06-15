import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import PostsModule from '~/store/modules/PostsModule'

// eslint-disable-next-line import/no-mutable-exports
let postsStore: PostsModule

function initializeStores (store: Store<any>): void {
  postsStore = getModule(PostsModule, store)
}

export { initializeStores, postsStore }
