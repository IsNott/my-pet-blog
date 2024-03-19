import { Text,Container,Card,Flex,Box,Avatar,AspectRatio,Separator,Heading } from "@radix-ui/themes"
import { ChatBubbleIcon,HeartIcon,Share2Icon } from "@radix-ui/react-icons";
export default function Page(id:string){
  console.log(id);
  
  return(
    <Container className=" flex-col items-center p-24">
      <Card style={{ width:"100%",height:"80%"}}>
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
        <Flex direction="row" gap="2">
          <AspectRatio ratio={16 / 8}>
            <img
              src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
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
            <Heading>Text Your Title Here ......</Heading>
            <Separator style={{width:"100%"}} ></Separator>
            <Text as="p" mb="2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam libero ac ex dapibus tempus.
              </Text>
              <Separator style={{width:"100%"}} ></Separator>
              <Flex justify="end" direction="row" gap="4">  
                <ChatBubbleIcon/>
                <HeartIcon/>
                <Share2Icon/>
              </Flex>
            </Flex>
          </Card>
        </Flex>
        
    </Card>
    </Container>
  )

}