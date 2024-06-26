import { fecthRandomBlog, fecthBlogCount } from "@/app/api/blog/data";
import { Flex, Card, Avatar, Text, Badge, Strong } from "@radix-ui/themes";
import { ChatBubbleIcon, HeartIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import { BlogUser, BlogParam, QueryParam } from "@/app/lib/dataDefinition";
import { getRandomColor } from "@/app/lib/utils";
import tagsColors from "@/app/lib/enum";
import { getTotalPage } from "@/app/lib/utils";
import Pagination from "@/app/ui/common/pagination";
import React, { Suspense } from "react";
import { CardSkeleton } from "./skeletons";
import PlogPage from "@/app/router/router";
import { Grid } from "@radix-ui/themes";

const defaultPageSize = 14;

export default async function CardWarpper({
  param,
  columnSize,
}: {
  param: QueryParam;
  columnSize: number | null;
}) {
  if (!columnSize) {
    columnSize = 7;
  }
  const countPlogs = await fecthBlogCount(param.query);
  const totalPage = getTotalPage(
    param.size || defaultPageSize,
    countPlogs.totalResult,
  );
  const plogs = await fecthRandomBlog({
    size: param.size ? param.size : defaultPageSize,
    num: param.pageNum,
    query: param.query,
  });
  return (
    <>
      <Grid columns={columnSize.toString()} gap="3" width="auto">
        {param.extra && <MyPlogCardRow blogs={plogs} />}
        {!param.extra && <CardRow blogs={plogs} />}
      </Grid>
      <div className="mt-6">
        <Pagination
          pageSize={defaultPageSize}
          totalPage={totalPage}
          path="plog"
        />
      </div>
    </>
  );
}

function CardRow(param: BlogParam) {
  const blogs = param.blogs;

  return (
    <>
      {blogs.map((plog: BlogUser) => {
        const linkHref = PlogPage.Detail + plog.post_id;
        const imgUrl = plog.img_urls.split(",")[0];
        var tags: string[] = [];
        if (plog.tags) {
          tags = plog.tags.split(",");
        }
        const badge = getTags(tags);
        {
          /* 在这一列Flex下所有的子元素都会继承4个gap（间隙） */
        }
        return (
          <Suspense key={plog.post_id} fallback={<CardSkeleton />}>
            <Link key={plog.post_id} href={linkHref}>
              <Card style={{ maxWidth: 300 }}>
                {/* top */}
                <Flex gap="2" direction="column">
                  <Flex gap="3" justify="between">
                    {/* 头像 */}
                    <Avatar
                      radius="large"
                      size="1"
                      src={plog.avatar_url}
                      fallback="A"
                    />
                    {/* 标题 */}
                    <Text>
                      <Strong>{plog.title}</Strong>
                    </Text>
                  </Flex>
                  <Flex gap="4">
                    {/* 添加一些小徽章，表示Tag */}
                    {badge}
                  </Flex>
                  <Flex gap="2">
                    {/* post_img */}
                    <Image
                      className="Image"
                      src={imgUrl}
                      width="600"
                      height="300"
                      alt={plog.title}
                    />
                  </Flex>
                  {/* poster_name */}
                  <Flex direction="column" gap="2">
                    <Text>{plog.poster_name}</Text>
                  </Flex>
                  {/* likes and comments */}
                  {/* padding-top justify=between：优先考虑两个事物之间的空间*/}
                  {/* 假设一行中只有两个物品，会尽量在他们之间保持最大空间 */}
                  <Flex justify="between" pt="1">
                    {/* 图标对齐文本 align-对齐 */}
                    <Flex align="center">
                      <ChatBubbleIcon />
                      {/* margin-left 边距2 */}
                      <Text color="gray" ml="2" size="1">
                        {plog.comments} Comments
                      </Text>
                    </Flex>
                    <Flex align="center">
                      <HeartIcon />
                      {/* margin-left 边距2 */}
                      <Text color="gray" ml="1" size="1">
                        {plog.likes}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </Link>
          </Suspense>
        );
      })}
    </>
  );
}

function MyPlogCardRow(param: BlogParam): React.ReactElement {
  const blogs = param.blogs;
  return (
    <>
      {blogs.map((plog: BlogUser) => {
        const linkHref = PlogPage.Detail + plog.post_id;
        const imgUrl = plog.img_urls.split(",")[0];
        var tags: string[] = [];
        if (plog.tags) {
          tags = plog.tags.split(",");
        }
        const badge = getTags(tags);
        return (
          <Link key={plog.post_id} href={linkHref}>
            <Card style={{ maxWidth: 300 }}>
              {/* top */}
              <Flex gap="2" direction="column">
                <Flex gap="4">{badge}</Flex>
                <Flex gap="2">
                  <Image
                    className="Image"
                    src={imgUrl}
                    width="600"
                    height="300"
                    alt={plog.title}
                  />
                </Flex>
                <Flex gap="3" justify="between">
                  <Text>
                    <Strong>{plog.title}</Strong>
                  </Text>
                </Flex>
                <Flex justify="between" pt="1">
                  <Flex align="center">
                    <ChatBubbleIcon />
                    <Text color="gray" ml="2" size="1">
                      {plog.comments ? plog.comments : 0} Comments
                    </Text>
                  </Flex>
                  <Flex align="center">
                    <HeartIcon />
                    <Text color="gray" ml="1" size="1">
                      {plog.likes}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          </Link>
        );
      })}
    </>
  );
}

function getTags(tags: string[]) {
  return (
    <div>
      {tags.map((tag) => (
        <Badge mr="1" key={tag} color={getRandomColor(tagsColors)}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}

export { MyPlogCardRow };
