export interface Post{
  readonly id: string;
  readonly author: string;
  readonly thumbnail: string;
  readonly title: string;
  readonly previewText: string;
  readonly content: string;
  readonly updatedDate: Date;
}

export interface Auth{
  isLogin:boolean;
  email:string;
  password:string;
}
