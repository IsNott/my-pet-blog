import { Text,Card,Flex,Avatar,Box,Separator,Grid } from "@radix-ui/themes"
import { Expression, QueryParam } from "@/app/lib/dataDefinition";
import CardWarpper from "@/app/ui/plog/Card";
import { auth } from "@/auth";

export  default async function MyPage() {
    const session : any = await auth()
  const query =  [{
    val: '',
  exp: Expression.EQ,
  filed: '',
  table: ''
  }]
  const param: QueryParam = {
    pageNum:1, 
    size:10, 
    query:null,
    extra:true
  }
  return(
    <main className="min-h-screen flex flex-row p-24">
      <div className="h-full  m-auto">
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
      <div className="p-10 m-auto">
        <CardWarpper param={param} columnSize={5}/>
      </div>
    </main>
  )
  
};
