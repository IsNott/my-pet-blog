import {
  Card,
  Flex,
  Avatar,
  Text,
  Container,
  Box,
  Link,
  AspectRatio,
  Separator,
  Skeleton,
  Grid,
} from "@radix-ui/themes";
import {
  ChatBubbleIcon,
  HeartIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import PlogPage from "@/app/router/router";

export function IndexCardSkeleton() {
  return (
    <>
      <Grid columns="7" gap="3" width="auto">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </Grid>
    </>
  );
}

export function CardSkeleton() {
  return (
    <Card>
      <Card style={{ maxWidth: 300 }}>
        <Flex gap="2" direction="column">
          <Flex gap="3" justify="between">
            {/* 头像 */}
            <Skeleton className="w-8 h-8" />
            {/* 标题 */}
            <Text>
              <Skeleton>username</Skeleton>
            </Text>
          </Flex>
          <Flex gap="4">
            {/* 小徽章*/}
            <Skeleton className="h-4 w-8" />
          </Flex>
          <Flex gap="2">
            <Skeleton>
              <div className="flex p-4">
                <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
                  <div
                    style={{ width: 200, height: 230 }}
                    className="rounded-md bg-gray-200"
                  />
                </div>
              </div>
            </Skeleton>
          </Flex>
          <Flex justify="between" pt="1">
            <Flex align="center">
              <Skeleton>
                <ChatBubbleIcon />
              </Skeleton>
              {/* 评论*/}
              <Text color="gray" ml="2" size="1">
                <Skeleton>100 comments</Skeleton>
              </Text>
            </Flex>
            <Flex align="center">
              <Skeleton>
                <HeartIcon />
              </Skeleton>
              {/* 点赞 */}
              <Text color="gray" ml="1" size="1">
                <Skeleton>1k+like</Skeleton>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Card>
  );
}

export function DetailCardSkeleton() {
  return (
    <Container className="flex-col items-center p-24">
      <Card style={{ width: "100%", height: "80%" }}>
        <Flex justify="between" direction="row">
          <Flex mb="3" gap="3" align="center">
            <Skeleton>
              <Avatar size="3" src={""} radius="full" fallback="A" />
            </Skeleton>
            <Box>
              <Skeleton>
                <Text mb="2" as="div" size="2" weight="bold">
                  username
                </Text>
              </Skeleton>
              <Skeleton>
                <Text as="div" size="2" color="gray">
                  nott/Test@email.com
                </Text>
              </Skeleton>
            </Box>
          </Flex>
          <Link href={PlogPage.Plog}>
            <ArrowRightIcon width="24" height="24" />
          </Link>
        </Flex>
        <Flex direction="row" gap="2">
          <Skeleton>
            <AspectRatio ratio={16 / 8}>
              <img
                src={""}
                alt={"default skeleton"}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "var(--radius-2)",
                }}
              />
            </AspectRatio>
          </Skeleton>
          <Card style={{ maxWidth: 400 }}>
            <Flex gap="3" direction="column" justify="between">
              <Skeleton>
                <Text>A Long Title here..</Text>
              </Skeleton>
              <Separator style={{ width: "100%" }} />
              <Skeleton>
                <Text style={{ height: 360 }} as="p" mb="2">
                  -
                </Text>
              </Skeleton>
              <Separator style={{ width: "100%" }}></Separator>
              <Flex justify="end" direction="row" gap="4">
                <Skeleton>
                  <Text>This is like bar</Text>
                </Skeleton>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Card>
    </Container>
  );
}
