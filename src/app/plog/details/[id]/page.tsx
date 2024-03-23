import { getBlogById } from "@/app/api/blog/data"
import { getUserById } from "@/app/api/user/data"
import DetailCard from "@/app/ui/plog/detailCard"
export default async function Page(param:string){
  const id = JSON.parse(JSON.stringify(param)).params.id
  const blog = await getBlogById(id)
  const sender = await getUserById(blog.poster_id)
  return(
    <main>
      <DetailCard blog={blog} sender={sender}/>
    </main>
  )

}