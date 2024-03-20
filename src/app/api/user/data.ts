import pool from "../../public/db";
import { User } from "@/app/lib/dataDefinition";


export async function getUserById(id:string){
    const data =  await pool.query('select * from user where id = ${id}')   
    console.log("User data:",data);
    return data
}