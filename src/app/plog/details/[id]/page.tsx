import { getBlogById } from "@/app/api/blog/data";
import { getUserById } from "@/app/api/user/data";
import DetailCard from "@/app/ui/plog/detailCard";
import { Suspense } from "react";
import { DetailCardSkeleton } from "@/app/ui/plog/skeletons";

export default async function Page(param: string) {
  const id = JSON.parse(JSON.stringify(param)).params.id;
  const blog = await getBlogById(id);
    
  const sender = await getUserById(blog.poster_id);
  return (
    <main>
      <Suspense fallback={<DetailCardSkeleton />}>
        <DetailCard blog={blog} sender={sender} />
      </Suspense>
    </main>
  );
}
