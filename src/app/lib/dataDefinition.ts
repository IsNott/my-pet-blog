// 定义数据格式
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar_url: string;
};

export type Blog = {
  id: string;
  title: string;
  context: string;
  create_time: string;
  likes: number;
  comments: number;
  poster_id: string;
  img_urls: string;
  tags: string;
};

export type BlogUser = {
  title: string;
  post_id: string;
  likes: number;
  comments: number;
  img_urls: string;
  avatar_url: string;
  poster_name: string;
  poster_id: string;
  tags: string;
};

export type tags = {
  id: string;
  tag_name: string;
};

export enum Expression {
  GE = ">=",
  LE = "<=",
  EQ = "=",
  NE = "!=",
  GT = ">",
  LT = "<",
  LIKE = "like",
  NULL = "IS NULL",
  NOT_NULL = "NOT NULL",
}

export type Condition = {
  val: any;
  field: string;
  expression: Expression;
};

export type State = {
  errors?: {
    senderId?: string[];
    title?: string[];
    context?: string[];
    imgs?: string[];
    create?: string;
  };
  success?: boolean;
  message?: string | null;
};

export type AuthUser = {
  username: string;
  uid: string;
};

export type LoginState = {
  success: boolean;
  errorMsg: string | null;
  user: AuthUser | null;
};
