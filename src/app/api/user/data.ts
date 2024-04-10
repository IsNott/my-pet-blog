import pool from "../../public/db";
import { User } from "@/app/lib/dataDefinition";

export async function getUserById(id: string) {
  const data = await pool.query("select * from users where id = ?", id);
  return data[0][0] as User;
}
