import Image from "next/image";
import { Container,Flex,Heading,Text,Card,Badge,Avatar,Strong } from "@radix-ui/themes";
import CardWarpper from "@/app/ui/plog/Card";
import { Suspense } from 'react';
import { IndexCardSkeleton } from "../ui/plog/skeletons";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {/* // <main> */}
     <Container size="4">
      <Suspense fallback={<IndexCardSkeleton/>}>
      <CardWarpper/>
      </Suspense>
     </Container>
    </main>
  );
}
