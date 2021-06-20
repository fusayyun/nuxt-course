export interface Post{
  readonly 'id': string;
  readonly author: string;
  readonly thumbnail: string;
  readonly title: string;
  readonly previewText: string;
  readonly content: string;
  readonly updatedDate: Date;
}
type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type PostEdited=Pick<Writeable<Post>, 'author' | 'title'| 'thumbnail'| 'content' | 'previewText'>

export type PostCreated = Pick<Post, 'author' | 'title'| 'thumbnail'| 'content' | 'previewText'|'updatedDate'>

export type PostPreviewed = Pick<Post, 'id' | 'thumbnail'|'title'|'previewText'>

export interface Auth{
  isLogin:boolean;
  email:string;
  password:string;
}
