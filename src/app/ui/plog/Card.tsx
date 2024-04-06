import { fecthRandomBlog,fecthBlogCount } from "@/app/api/blog/data";
import { Flex,Card,Avatar,Text,Badge,Strong} from "@radix-ui/themes";
import { CardStackIcon, ChatBubbleIcon ,HeartIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import { BlogUser } from "@/app/lib/dataDefinition";
import { getRandomColor } from "@/app/lib/utils";
import tagsColors from '@/app/lib/enum'
import { getTotalPage } from "@/app/lib/utils";
import Pagination from "@/app/ui/common/pagination";
import React, { Suspense } from "react";
import { CardSkeleton } from "./skeletons";
import dynamic from "next/dynamic";

const defaultPageSize = 8
const PageComponent = dynamic(() => import('@/app/ui/common/pagination'), { ssr: false })

interface BlogParam {
  blogs: BlogUser[]
}

interface QueryParam {
  pageNum: any,
  size: number | undefined,
  query: any
}

export default async function CardWarpper(param:QueryParam) {
    const countPlogs = await fecthBlogCount(param.query)    
    const totalPage = getTotalPage(defaultPageSize,countPlogs.totalResult)
    const plogs = await fecthRandomBlog({
      size: param.size ? param.size : defaultPageSize,
      num : param.pageNum,
      keyword: param.query
    })
    let firstHalfPLogs, secondHalfPLogs;
    if (plogs.slice(0, plogs.length / 2).length < plogs.slice(plogs.length / 2).length) {
      [secondHalfPLogs, firstHalfPLogs] = [
        plogs.slice(0, plogs.length / 2),
        plogs.slice(plogs.length / 2)
      ];
    } else {
      [firstHalfPLogs, secondHalfPLogs] = [
        plogs.slice(0, plogs.length / 2),
        plogs.slice(plogs.length / 2)
      ];
    }
    return(
      <>
      <Flex pb="4" gap="4" direction="row">
        <CardRow blogs={firstHalfPLogs}/>
      </Flex>
      <Flex pb="4" gap="4" direction="row">
        <CardRow blogs={secondHalfPLogs}/>
      </Flex>
      <Pagination pageSize={defaultPageSize} totalPage = {totalPage} path="plog"/>
      </>
    )
};

async function CardRow(param:BlogParam) {   
    const blogs = param.blogs
    return(
      <>
      {blogs.map((plog:BlogUser)=>{   
        const link = "/plog/details/" + plog.post_id
        const imgUrl = plog.img_urls.split(",")[0]
        var tags:string[] = []
        if(plog.tags){
          tags = plog.tags.split(',')
        }
        const badge = getTags(tags)
        {/* 在这一列Flex下所有的子元素都会继承4个gap（间隙） */}
        return (
          <Suspense key={plog.post_id} fallback={<CardSkeleton/>}>
          <Link key={plog.post_id} href={link}>
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
                <Text><Strong>{plog.title}</Strong></Text>
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
                  <ChatBubbleIcon/>
                  {/* margin-left 边距2 */}
                  <Text color="gray" ml="2" size="1">{plog.comments} Comments</Text>
                </Flex>         
                <Flex align="center">
                <HeartIcon/>
                  {/* margin-left 边距2 */}
                  <Text color="gray" ml="1" size="1">{plog.likes}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Link>
          </Suspense>
        )
      })}
      </>
    )

};

function getTags(tags:string[]){
  return(
    <div>
      {
        tags.map(tag => (
          <Badge mr="1" key={tag} color={getRandomColor(tagsColors)}>
            {tag}
            </Badge>
        ))
      }
    </div>
  )
}


