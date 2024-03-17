'use client'
import Image from "next/image";
import { Container,Flex,Heading,Text,Card,Badge } from "@radix-ui/themes";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Container size="1">
      {/* pb设置一些间距 padding-bottom  */}
        <Flex direction="column" pb="4">
          <Heading>Little Dog Book</Heading>
          <Text color="gray">Here you can find the issues relevant to your certain project.</Text>
        </Flex>
        {/* 在这一列Flex下所有的子元素都会继承4个gap（间隙） */}
        <Flex gap="4" direction="row">
          <Card>
            <Flex gap="1" direction="column">
              <Text>Poster: 望月</Text>
              <Flex gap="2">
                {/* 添加一些小徽章 */}
                <Badge color="orange">Pet</Badge>
                <Badge color="bule">dog</Badge>
              </Flex>
              <Flex gap="2">
              <img
                  className="Image"
                  src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
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
                  <Text color="gray" ml="2" size="1">3 Comments</Text>
                </Flex>
                {/* <ChatBubbleIcon/> */}
              </Flex>
            </Flex>
          </Card>
          
        </Flex>
     </Container>
    </main>
  );
}
