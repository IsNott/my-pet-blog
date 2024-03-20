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
    create_time: Date;
    likes: number;
    comments: number;
    poster_id: string;
    img_urls: string;
}