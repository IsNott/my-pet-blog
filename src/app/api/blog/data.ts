import pool from "@/app/public/db";
import { Blog, BlogUser, Query, CommentCount } from "@/app/lib/dataDefinition";
import { getSqlByQuery } from "@/app/lib/utils";

export async function getBlogById(id: string) {
  const connect = await pool.getConnection();
  const [row] = await connect.query("select * from blog where id = ?", id);
  const results: Blog[] = row as Blog[];
  connect.release();
  return results[0];
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
  // search plog
  let sql = `select t1.tags,t1.title,t1.id as post_id,t1.img_urls,t2.avatar_url,t2.name as poster_name,t2.id as poster_id,t2.email from blog t1 LEFT JOIN users t2 on t1.poster_id = t2.id ${conditionStr} order by t1.create_time desc LIMIT ${limitStr}`;
  const [row] = await connect.query(sql);
  let plogResult: BlogUser[] = row as BlogUser[];

  // count comment
  let ids = plogResult.map((r) => `'${r.post_id}'`);
  if(ids.length > 0){
    let countCommnetSql = `select plog_id,count(plog_id) as count from comment where plog_id in(${ids}) group By plog_id`;
    console.log("Debug issue01 countCommnetSql:", countCommnetSql);

    const [comment] = await connect.query(countCommnetSql);
    let commntCountResult: CommentCount[] = comment as CommentCount[];
    plogResult.forEach((r) => {
      commntCountResult.forEach((c) => {
        if ((c.plogId = r.post_id)) {
          r.comments = c.count;
        }
      });
    });
  }
  console.log("Debug issue03 blogs",plogResult);
  
  connect.release();
  return plogResult;
}

type countResult = {
  totalResult: number;
};

export async function fecthBlogCount(query: Query[] | null) {
  const connect = await pool.getConnection();
  let conditionStr = getSqlByQuery(query);
  let sql = `select count(1) as totalResult from blog t1 left join users t2 on t1.poster_id = t2.id ${conditionStr}`;
  const [row] = await connect.query(sql);
  const result: countResult[] = row as countResult[];
  connect.release();
  return result[0];
}
