import { Text, Card, Flex, Avatar, Box, Separator } from "@radix-ui/themes";
import {
  Expression,
  QueryParam,
  Query,
  SQLType,
} from "@/app/lib/dataDefinition";
import CardWarpper from "@/app/ui/plog/Card";
import { auth } from "@/auth";
import { number } from "zod";
import { ServerAuth } from "@/app/lib/dataDefinition";
import { Session } from "next-auth";

export default async function MyPage({
  searchParams,
}: {
  searchParams?: {
    query?: number;
    page?: string;
    size?: number | undefined;
  };
}) {
  const session: Session | null = await auth();
  const custSession = session as ServerAuth;
  console.log("Debug issues03 auth,", session);

  const query: Query[] = [
    {
      val: custSession?.sub,
      exp: Expression.EQ,
      filed: "poster_id",
      table: "t1",
      type: SQLType.VARCHAR,
    },
  ];
  const param: QueryParam = {
    pageNum: Number(searchParams?.page) || 1,
    size: 10,
    query: query,
    extra: true,
  };
  return (
    <main className="min-h-screen flex flex-row p-24">
      <div className="h-full  m-auto">
        <Card className="pl-12" variant="ghost">
          <Flex gap="3" direction="column" align="start">
            <Avatar
              size="9"
              src={custSession?.picture}
              alt={custSession?.name}
              fallback="Avatar"
            />
            <Box>
              <Text as="div" size="6" weight="bold">
                {custSession?.name}
              </Text>
              <Text as="div" size="2" color="gray">
                {custSession?.email}
              </Text>
            </Box>
          </Flex>
          <Separator my="3" size="4" />
          <Flex justify="between" align="center" gap="3" direction="row">
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
        <CardWarpper param={param} columnSize={5} />
      </div>
    </main>
  );
}
