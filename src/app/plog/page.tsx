import { Container, IconButton } from "@radix-ui/themes";
import CardWarpper from "@/app/ui/plog/Card";
import { Suspense } from "react";
import { IndexCardSkeleton } from "@/app/ui/plog/skeletons";
export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    size?: number | undefined;
  };
}) {
  return (
    <main className="flex-wrap flex min-h-screen flex-col items-center justify-between p-24">
      {/* // <main> */}
      <Container size="5">
        <Suspense fallback={<IndexCardSkeleton />}>
          <CardWarpper
            size={searchParams?.size}
            query={searchParams?.query}
            pageNum={searchParams?.page}
          />
        </Suspense>
      </Container>
    </main>
  );
}
