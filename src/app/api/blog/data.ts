import pool from "../../public/db";
import { Blog, BlogUser } from "@/app/lib/dataDefinition";

export async function getBlogById(id: string) {
  const connect = await pool.getConnection();
  const data = await connect.query("select * from blog where id = ?", id);
  connect.release();
  return data[0][0] as unknown as Blog;
}

export async function fecthRandomBlog({
  size,
  num,
  keyword,
}: {
  size: number;
  num: number;
  keyword: string;
}) {
  size = size ? size : 10;
  num = num ? num : 1;
  let keywordStr = "";
  if (keyword) {
    keywordStr = `where t1.title like '%${keyword}%' or t1.context like '%${keyword}%' or t2.name like '%${keyword}%'`;
  }
  const limitStr = (num - 1) * size + "," + size;
  const connect = await pool.getConnection();
  const data = await connect.query(
    `select t1.tags,t1.title,t1.id as post_id,t1.likes,t1.comments,t1.img_urls,t2.avatar_url,t2.name as poster_name,t2.id as poster_id,t2.email from blog t1 LEFT JOIN users t2 on t1.poster_id = t2.id ${keywordStr} order by t1.create_time desc LIMIT ${limitStr}`,
  );
  connect.release();
  return data[0] as BlogUser[];
}

export async function fecthBlogCount(keyword: string) {
  const connect = await pool.getConnection();
  let keywordStr = "";
  if (keyword) {
    keywordStr = `where t1.title like '%${keyword}%' or t1.context like '%${keyword}%' or t2.name like '%${keyword}%'`;
  }
  const data = await connect.query(
    `select count(1) as totalResult from blog t1 left join users t2 on t1.poster_id = t2.id ${keywordStr}`,
  );
  connect.release();
  return data[0][0];
}
