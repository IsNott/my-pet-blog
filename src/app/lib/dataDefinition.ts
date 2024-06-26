import { Session } from "next-auth";
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

export enum SQLType {
  VARCHAR = "varchar",
  NUMBER = "NUMBER",
  DATE = "DATE",
  DATE_TIME = "DATE_TIME",
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

export type LogState = {
  success: boolean;
  errorMsg: string | null;
};

export type RegisterState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  success: boolean;
  errorMsg: string | null;
};

export interface BlogParam {
  blogs: BlogUser[];
}

export interface QueryParam {
  pageNum: number;
  size: number | undefined;
  query: Query[] | null;
  extra: boolean;
}

export type Query = {
  val: string | undefined;
  exp: Expression;
  filed: string;
  table: string;
  type: SQLType;
};

export type Comment = {
  id: string;
  plogId: string;
  commentText: string;
  senderId: string;
};

export type CommentCount = {
  id: string;
  plogId: string;
  count: number;
};

export type UserPageCountData = {
  like: number;
  post: number;
}

export interface ServerAuth extends Session {
  name: string;
  email: string;
  picture: string;
  sub: string;
  iat: number;
  exp: number;
  jti: string;
  expires: string;
  status: string;
}
