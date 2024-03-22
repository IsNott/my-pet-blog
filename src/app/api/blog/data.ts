import pool from "../../public/db";
import { Blog,BlogUser } from "@/app/lib/dataDefinition";

export async function getBlogById(id:string){
    const data =  await pool.query('select * from blog where id = ?',id)   
    return data[0][0] as unknown as Blog
}

export async function fecthRandomBlog() {
    const data = await pool.query('select t1.title,t1.id as post_id,t1.likes,t1.comments,t1.img_urls,t2.avatar_url,t2.`name` as poster_name,t2.id as poster_id,t2.email from blog t1 LEFT JOIN users t2 on t1.poster_id = t2.id order by t1.create_time desc LIMIT 0,6')
    return data[0] as BlogUser[]
}