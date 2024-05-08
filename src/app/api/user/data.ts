import pool from "../../public/db";
import { User, UserPageCountData } from "@/app/lib/dataDefinition";

export async function getUserById(id: string) {
  const [row] = await pool.query(`select * from users where id = '${id}'`);
  const result : User[] = row as User[]
  return result[0];
}

export async function countDataByUserId(id: string) {
  const [postCountRow] = await pool.query(`select count(1) as count from blog where poster_id = '${id}'`)  
  const postCountResult : any[] = postCountRow as any[]
  const [likeCountRow] = await pool.query(`select count(t2.id) as count from likes t1 LEFT JOIN blog t2 on t1.post_id = t2.id where t2.poster_id = '${id}'`)
  const likeCountResult : any[] = likeCountRow as any[]
  return {
    like: likeCountResult[0].count,
    post: postCountResult[0].count
  } as UserPageCountData
}
