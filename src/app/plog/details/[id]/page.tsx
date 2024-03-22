import { getBlogById } from "@/app/api/blog/data"
import { getUserById } from "@/app/api/user/data"
import DetailCard from "@/app/ui/plog/detailCard"
export default async function Page(id:string){
  const blog = await getBlogById('41053414b2-4001-4271-9855-fec4b6a6442a')
  const sender = await getUserById(blog.poster_id)
  return(
    <main>
      <DetailCard blog={blog} sender={sender}/>
    </main>
  )

}