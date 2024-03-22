import pool from "../../public/db";
import { Blog } from "@/app/lib/dataDefinition";

export async function getBlogById(id:string){
    const data =  await pool.query('select * from blog where id = ?',id)   
    return data as Blog
    console.log("Fetch Blog Data:",data[0]);
    return data
}