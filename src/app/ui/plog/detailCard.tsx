'use client'

import { Blog,User } from "@/app/lib/dataDefinition";
import { Text,Container,Card,Flex,Box,Avatar,AspectRatio,Separator,Heading,ScrollArea } from "@radix-ui/themes"
import { ChatBubbleIcon,HeartIcon,Share2Icon,ArrowRightIcon,HeartFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Link from "next/link";
import PlogPage from "@/app/router/router";

export default function DetailCard({blog,sender} :{blog : Blog,sender:User}) {
  var [isLike, setIsVisible] = useState(false);  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = blog.img_urls.split(',')
  // 切换到下一张图片
    const showNextImage = () => {
    if (currentImageIndex < images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
    }
    if(currentImageIndex == images.length - 1){
        setCurrentImageIndex(0)
    }
    }
    return(
        <Container className=" flex-col items-center p-24">
          <Card style={{ width:"100%",height:"80%"}}>
            <Flex justify="between" direction="row">
            <Flex mb="3" gap="3" align="center">
              <Avatar 
                size="3"
                src={sender.avatar_url}
                radius="full"
                fallback="A"
              />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {sender.name}
                </Text>
                <Text as="div" size="2" color="gray">
                  {sender.email}
                </Text>
              </Box>
            </Flex>
            <Link href={PlogPage.Plog}>
            <ArrowRightIcon width="24" height="24" 
            />
            </Link>
    
            </Flex>
            <Flex direction="row" gap="2">
              <AspectRatio onClick={showNextImage} ratio={16 / 8}>
                <img
                  src={images[currentImageIndex]}
                  alt={blog.title}
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
                  <Heading style={{width:388}} mr="2">{blog.title}</Heading>
                  <Separator style={{width:"100%"}} ></Separator>
                  <ScrollArea type="always" scrollbars="vertical" style={{ height: 320 }}>
                    <Text as="p" mb="2">
                      {blog.context}
                    </Text>
                  </ScrollArea>
                  <Separator style={{width:"100%"}} ></Separator>
                  <Flex justify="end" direction="row" gap="4">  
                    <Flex gap="2" align="center">
                        {isLike &&  <HeartIcon height="18" width="18"
                       onClick={()=> {
                        if(isLike){
                          isLike = false
                          setIsVisible(false)
                        }
                       }}
                       />}
                      {!isLike && <HeartFilledIcon height="18" width="18"
                      onClick={()=> {
                        setIsVisible(!isLike)
                       }}
                      />}
                      <Text>{blog.likes}</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <ChatBubbleIcon height="18" width="18"/>
                      <Text>{blog.comments}</Text>
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
};
