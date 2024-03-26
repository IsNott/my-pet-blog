import { Container } from "@radix-ui/themes";
import CardWarpper from "@/app/ui/plog/Card";
import { Suspense } from 'react';
import { IndexCardSkeleton } from "@/app/ui/plog/skeletons";
export default function Home({
  searchParams
}: {
  searchParams?: {
    query?: string;
    page?: string;
  }
}) {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {/* // <main> */}
     <Container size="4">
      <Suspense fallback={<IndexCardSkeleton/>}>
        <CardWarpper query={searchParams?.query} pageNum={searchParams?.page}/>
      </Suspense>
     </Container>
    </main>
  );
}



