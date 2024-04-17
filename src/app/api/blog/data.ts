import pool from "../../public/db";
import { Blog, BlogUser, Query } from "@/app/lib/dataDefinition";
import { getSqlByQuery } from "@/app/lib/utils";

export async function getBlogById(id: string) {
  const connect = await pool.getConnection();
  const data : any = await connect.query("select * from blog where id = ?", id);
  connect.release();
  return data[0][0] as Blog;
}

export async function fecthRandomBlog({
  size,
  num,
  query,
}: {
  size: number;
  num: number;
  query: Query[] | null;
}) {
  size = size ? size : 10;
  num = num ? num : 1;
  const conditionStr = getSqlByQuery(query);
  const limitStr = (num - 1) * size + "," + size;
  const connect = await pool.getConnection();
  let sql = `select t1.tags,t1.title,t1.id as post_id,t1.likes,t1.comments,t1.img_urls,t2.avatar_url,t2.name as poster_name,t2.id as poster_id,t2.email from blog t1 LEFT JOIN users t2 on t1.poster_id = t2.id ${conditionStr} order by t1.create_time desc LIMIT ${limitStr}`;

  const data : any = await connect.query(sql);
  connect.release();
  return data[0] as BlogUser[];
}

export async function fecthBlogCount(query: Query[] | null) {
  const connect = await pool.getConnection();
  let conditionStr = getSqlByQuery(query);
  let sql = `select count(1) as totalResult from blog t1 left join users t2 on t1.poster_id = t2.id ${conditionStr}`;

  const data : any = await connect.query(sql);
  connect.release();
  return data[0][0];
}
