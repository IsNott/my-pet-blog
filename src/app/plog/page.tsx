import { Container, IconButton } from "@radix-ui/themes";
import CardWarpper from "@/app/ui/plog/Card";
import { Suspense } from "react";
import { IndexCardSkeleton } from "@/app/ui/plog/skeletons";
import { Expression, Query, QueryParam } from "../lib/dataDefinition";
export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    size?: number | undefined;
  };
 
}) {
  const query:Query = {
    val: searchParams?.query,
    exp: Expression.EQ,
    filed: 'title',
    table: 't1'
  }
  const param : QueryParam = {
    size:searchParams?.size,
    query:[query],
    pageNum:searchParams?.page,
    extra: false
    
  }
  return (
    <main className="flex-wrap flex min-h-screen flex-col items-center justify-between p-24">
      {/* // <main> */}
      <Container size="5">
        <Suspense fallback={<IndexCardSkeleton />}>
          <CardWarpper
            param={param} columnSize={7 }
          />
        </Suspense>
      </Container>
    </main>
  );
}
