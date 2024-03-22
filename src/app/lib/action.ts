
import { getBlogById } from "../api/blog/data";
export default async function fetchBlog(id:string) {
    const blog = await getBlogById(id)
    return blog
}