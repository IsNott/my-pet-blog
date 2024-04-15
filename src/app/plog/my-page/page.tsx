'use client'
import { Text,Card,Flex,Avatar,Box,Separator,Grid } from "@radix-ui/themes"
import { useSession } from "next-auth/react";
import { BlogUser } from "@/app/lib/dataDefinition";
import CardWarpper from "@/app/ui/plog/Card";

interface BlogParam {
  blogs: BlogUser[];
}
export default function MyPage() {
  
  const { data } : {data: any} = useSession()
  const session = data?.session  
  return(
    <main className="min-h-screen flex flex-row p-24">
      <div className="h-full my-auto">
      <Card className="pl-12" variant='ghost'>
      <Flex gap="3" direction="column" align="start">
        <Avatar
          size="9"
          src={session?.picture}
          alt={session?.name}
          fallback="Avatar"
        />
        <Box>
          <Text as="div" size="6" weight="bold">
            {session?.name}
          </Text>
          <Text as="div" size="2" color="gray">
            {session?.email}
          </Text>
        </Box>
      </Flex>
      <Separator my="3" size="4" />
        <Flex justify="between" align="center" gap='3' direction="row">
          <Flex direction="column">
          <Text weight="bold">Like</Text>
          <Text>100+</Text>
          </Flex>
          <Flex direction="column">
          <Text weight="bold">Post</Text>
          <Text>100+</Text>
          </Flex>
        </Flex>
  </Card>
      </div>
      <div className="p-10">
        <CardWarpper/>
      </div>
    </main>
  )
  
};
