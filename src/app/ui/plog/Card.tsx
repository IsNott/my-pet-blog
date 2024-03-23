import { fecthRandomBlog } from "@/app/api/blog/data";
import { Flex,Card,Avatar,Text,Badge,Strong} from "@radix-ui/themes";
import { ChatBubbleIcon ,HeartIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import { BlogUser } from "@/app/lib/dataDefinition";

export default async function CardWarpper() {
    const plogs = await fecthRandomBlog()
    const [firstHalfPLogs, secondHalfPLogs] = [
      plogs.slice(0, plogs.length / 2),
      plogs.slice(plogs.length / 2)
    ];
    return(
      <>
      <Flex pb="4" gap="4" direction="row">
        <CardRow blogs={firstHalfPLogs}/>
      </Flex>
      <Flex pb="4" gap="4" direction="row">
        <CardRow blogs={secondHalfPLogs}/>
      </Flex>
      </>
    )
};

function CardRow(param:BlogUser[]) {
    console.log(param.blogs.length);
    return(
      <>
      {param.blogs.map((plog)=>{
        const link = "/plog/details/" + plog.post_id
        const imgUrl = plog.img_urls.split(",")[0]
        {/* 在这一列Flex下所有的子元素都会继承4个gap（间隙） */}
        return (
          <Link key={plog.post_id} href={link}>
          <Card style={{ maxWidth: 300 }}>
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
                <Text><Strong>{plog.poster_name}</Strong></Text>
              </Flex>
              
              <Flex gap="4">
                {/* 添加一些小徽章，表示Tag */}
                <Badge color="orange">Tag</Badge>
              </Flex>
              <Flex gap="2">
                <Image
                    className="Image"
                    src={imgUrl}
                    width="600"
                    height="300"
                    alt="Landscape photograph by Tobias Tullius"
                    />
              </Flex>
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
        )
      })}
      </>
    )

};

