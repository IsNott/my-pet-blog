import { Card,Flex,Avatar,Text,Strong
  ,Badge,Container,Box,Link,AspectRatio,Heading,Separator} from "@radix-ui/themes"
import { ChatBubbleIcon,HeartIcon,ArrowRightIcon,Share2Icon } from "@radix-ui/react-icons"
export function IndexCardSkeleton(){
  return(
    <>
    <Flex pb="4" gap="4" direction="row">
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
      </Flex>
      <Flex pb="4" gap="4" direction="row">
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
      </Flex>
    </>
  )
}

export function CardSkeleton(){
  return(
    <Card>
      <Card style={{ maxWidth: 300 }}>
            <Flex gap="2" direction="column">
              <Flex gap="3" justify="between">
                {/* 头像 */}
                <div className="flex items-center">
                <div style={{width:20,height:20,backgroundColor:"gray"}}>
                </div>
                </div>
                {/* 标题 */}
                <Text><Strong>-</Strong></Text>
              </Flex>
              
              <Flex gap="4">
                {/* 添加一些小徽章，表示Tag */}
                <Badge>tag</Badge>
              </Flex>
              <Flex gap="2">
              <div className="flex p-4">
                  <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
                  <div style={{width:200,height:300}} className="rounded-md bg-gray-200" />
                  </div>
              </div>              
                
              </Flex>
              {/* padding-top justify=between：优先考虑两个事物之间的空间*/}
              {/* 假设一行中只有两个物品，会尽量在他们之间保持最大空间 */}
              <Flex justify="between" pt="1">
              {/* 图标对齐文本 align-对齐 */}
                <Flex align="center">
                  <ChatBubbleIcon/>
                  {/* margin-left 边距2 */}
                  <Text color="gray" ml="2" size="1">Comments</Text>
                </Flex>
                <Flex align="center">
                <HeartIcon/>
                  {/* margin-left 边距2 */}
                  <Text color="gray" ml="1" size="1">-</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
    </Card>
  )
}

export function DetailCardSkeleton(){
  return(
    <Container className=" flex-col items-center p-24">
          <Card style={{ width:"100%",height:"80%"}}>
            <Flex justify="between" direction="row">
            <Flex mb="3" gap="3" align="center">
              <Avatar 
                size="3"
                src={""}
                radius="full"
                fallback="A"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  -
                </Text>
                <Text as="div" size="2" color="gray">
                  -
                </Text>
              </Box>
            </Flex>
            <Link href={"/plog"}>
            <ArrowRightIcon width="24" height="24" 
            />
            </Link>
    
            </Flex>
            <Flex direction="row" gap="2">
              <AspectRatio ratio={16 / 8}>
                <img
                  src={""}
                  alt={"default skeleton"}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    borderRadius: 'var(--radius-2)',
                  }}
                />
              </AspectRatio>  
              <Card style={{maxWidth:400}}>
                <Flex gap="3" direction="column"  justify="between">
                  <Heading style={{width:388}} mr="2">-</Heading>
                  <Separator style={{width:"100%"}} ></Separator>
                  <Text style={{height:360}} as="p" mb="2">
                    -
                  </Text>
                  <Separator style={{width:"100%"}} ></Separator>
                  <Flex justify="end" direction="row" gap="4">  
                    <Flex gap="2" align="center">
                    <HeartIcon height="18" width="18"/>
                      <Text>-</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <ChatBubbleIcon height="18" width="18"/>
                      <Text>-</Text>
                    </Flex>
                    <Flex gap="2" mr="2" align="center">
                      <Share2Icon height="18" width="18"/>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </Flex>
        </Card>
        </Container>
  )
}