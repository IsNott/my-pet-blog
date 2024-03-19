'use client'
import Image from "next/image";
import { Container,Flex,Heading,Text,Card,Badge,Avatar,TextField } from "@radix-ui/themes";
import { ChatBubbleIcon,HeartIcon,MagnifyingGlassIcon } from "@radix-ui/react-icons";
import TopNav from "./ui/common/topNav";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Container size="3">
      {/* 搜索栏 */}
      <Flex pb="5">
        <TextField.Root>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input size="3" radius="medium" placeholder="Search the Plog..." />
        </TextField.Root>
      </Flex>
      {/* pb设置一些间距 padding-bottom  */}
        <Flex gap="3" direction="column" pb="4">
          <Flex gap="3" direction="column">
          <Heading>Little Dog Book</Heading>
          <Text color="gray">Here you can find the issues relevant to your certain project.</Text>
          </Flex>
        </Flex>
        {/* 在这一列Flex下所有的子元素都会继承4个gap（间隙） */}
        <Flex pb="4" gap="4" direction="row">
          <Card>
            <Flex gap="2" direction="column">
              <Flex gap="3" justify="between">
                {/* 头像 */}
                <Avatar
                  radius="large"
                  size="1"
                  src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                  fallback="A"
                />
                {/* 标题 */}
                <Text>Poster: 望月</Text>
              </Flex>
              
              <Flex gap="4">
                {/* 添加一些小徽章，表示Tag */}
                <Badge color="orange">Tag</Badge>
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
                <Flex align="center">
                <HeartIcon/>
                  {/* margin-left 边距2 */}
                  <Text color="gray" ml="1" size="1">1k+</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
          <Card>
            <Flex gap="2" direction="column">
              <Flex gap="3" justify="between">
                {/* 头像 */}
                <Avatar
                  radius="large"
                  size="1"
                  src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                  fallback="A"
                />
                {/* 标题 */}
                <Text>Poster: 望月</Text>
              </Flex>
              
              <Flex gap="2">
                {/* 添加一些小徽章，表示Tag */}
                <Badge color="orange">Tag</Badge>
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
          <Card>
            <Flex gap="2" direction="column">
              <Flex gap="3" justify="between">
                {/* 头像 */}
                <Avatar
                  size="1"
                  src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                  fallback="A"
                />
                {/* 标题 */}
                <Text>Poster: 望月</Text>
              </Flex>
              
              <Flex gap="2">
                {/* 添加一些小徽章，表示Tag */}
                <Badge color="orange">Tag</Badge>
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
        <Flex pb="4" gap="4" direction="row">
          <Card>
            <Flex gap="2" direction="column">
              <Flex gap="3" justify="between">
                {/* 头像 */}
                <Avatar
                  size="1"
                  src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                  fallback="A"
                />
                {/* 标题 */}
                <Text>Poster: 望月</Text>
              </Flex>
              
              <Flex gap="2">
                {/* 添加一些小徽章，表示Tag */}
                <Badge color="orange">Tag</Badge>
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
              </Flex>
            </Flex>
          </Card>
          <Card>
            <Flex gap="2" direction="column">
              <Flex gap="3" justify="between">
                {/* 头像 */}
                <Avatar
                  size="1"
                  src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                  fallback="A"
                />
                {/* 标题 */}
                <Text>Poster: 望月</Text>
              </Flex>
              
              <Flex gap="2">
                {/* 添加一些小徽章，表示Tag */}
                <Badge color="orange">Tag</Badge>
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
          <Card>
            <Flex gap="2" direction="column">
              <Flex gap="3" justify="between">
                {/* 头像 */}
                <Avatar
                  size="1"
                  src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                  fallback="A"
                />
                {/* 标题 */}
                <Text>Poster: 望月</Text>
              </Flex>
              
              <Flex gap="2">
                {/* 添加一些小徽章，表示Tag */}
                <Badge color="orange">Tag</Badge>
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
