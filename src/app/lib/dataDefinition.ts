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
}

export type BlogUser ={
    title: string;
    post_id: string;
    likes: number;
    comments: number;
    img_urls: string;
    avatar_url: string;
    poster_name: string;
    poster_id: string;
    tags: string;
}


export type tags = {
   id: string;
   tag_name: string;
}