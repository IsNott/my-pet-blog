'use client'
import { Text,Container,Card,Flex,Box,Avatar,AspectRatio,Separator,Heading } from "@radix-ui/themes"
import { ChatBubbleIcon,HeartIcon,Share2Icon,ArrowRightIcon,HeartFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Link from "next/link";
export default function Page(id:string){
  var [isLike, setIsVisible] = useState(false);
  // const router = useRouter()  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80',
    '/20240322105634.jpg',
    '/20240322105648.jpg',
    '/20240322105655.jpg'
  ]


// 切换到下一张图片
const showNextImage = () => {
  if (currentImageIndex < images.length - 1) {
    setCurrentImageIndex(currentImageIndex + 1);
  }
  if(currentImageIndex == images.length - 1){
    setCurrentImageIndex(0)
  }
};
  return(
    <Container className=" flex-col items-center p-24">
      <Card style={{ width:"100%",height:"80%"}}>
        <Flex justify="between" direction="row">
        <Flex mb="3" gap="3" align="center">
          <Avatar
            size="3"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            radius="full"
            fallback="T"
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              Teodros Girmay
            </Text>
            <Text as="div" size="2" color="gray">
              Engineering
            </Text>
          </Box>
        </Flex>
        <Link href={"/plog"}>
        <ArrowRightIcon width="24" height="24" 
        />
        </Link>

        </Flex>
        <Flex direction="row" gap="2">
          <AspectRatio onClick={showNextImage} ratio={16 / 8}>
            <img
              src={images[currentImageIndex]}
              alt="A house in a forest"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                borderRadius: 'var(--radius-2)',
              }}
            />
          </AspectRatio>  
          <Card style={{maxWidth:400}}>
            <Flex  gap="3" direction="column"  justify="between">
              <Heading>My Frist Blog..</Heading>
              <Separator style={{width:"100%"}} ></Separator>
              <Text as="p" mb="2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam libero ac ex dapibus tempus.
              </Text>
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
                  <Text>100+</Text>
                </Flex>
                <Flex gap="2" align="center">
                  <ChatBubbleIcon height="18" width="18"/>
                  <Text>20+</Text>
                </Flex>
                <Flex gap="2" align="center">
                  <Share2Icon height="18" width="18"/>
                  <Text>100+</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Flex>
        
    </Card>
    </Container>
  )

}