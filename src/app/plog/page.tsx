import Image from "next/image";
import { Container,Flex,Heading,Text,Card,Badge,Avatar,Strong } from "@radix-ui/themes";
import CardWarpper from "@/app/ui/plog/Card";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {/* // <main> */}
     <Container size="4">
      <CardWarpper/>
     </Container>
    </main>
  );
}
