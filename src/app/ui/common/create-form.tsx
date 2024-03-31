'use client'
import { AlertDialog,Text,Button,Flex,Card,Separator,Strong,TextField,TextArea, Box } from "@radix-ui/themes"
import { useFormState,useFormStatus } from "react-dom"
import { doNewPost } from "@/app/lib/action"
import Link from "next/link"
import UploadImage from "./upload-form"
export default function CreateForm() {
    const [errorMessage, dispatch] = useFormState(doNewPost, undefined);
    
    return(
        <AlertDialog.Root>
            {/* 发布按钮 */}
            <AlertDialog.Trigger>
                <Link href="">
                <Text size="2">
                    New Post
                </Text>
                </Link>
            </AlertDialog.Trigger>
            {/* 正文 */}
            <AlertDialog.Content style={{maxWidth:"500px"}}>
                {/* 标题 */}
                <AlertDialog.Title>New Post</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    What's your mood?
                </AlertDialog.Description>
                <Separator my="3" size="4" />
                <form action={dispatch}>
                    <Card>
                        <Flex direction="column" gap="3">
                            <Flex direction="column" gap="3">
                                <Text><Strong>Title</Strong></Text>
                                <Separator size="4"/>
                                <TextField.Root placeholder="Search the docs…">
                                  {/* <TextField.Slot>
                                    <MagnifyingGlassIcon height="16" width="16" />
                                  </TextField.Slot> */}
                                </TextField.Root>
                                {/* <input className="Input" type="text" id="firstName" placeholder="Type something" /> */}
                            </Flex>
                            <Flex direction="column" gap="3">
                                <Text><Strong>Context</Strong></Text>
                                <Box style={{width:"300"}}>
                                    <TextArea size="2" placeholder="Type something…" />
                                </Box>
                            </Flex>
                            <Flex direction="column" gap="3">
                                <Text><Strong>Images</Strong></Text>
                                <UploadImage/>
                            </Flex>
                        </Flex>
                    </Card>
                </form>
            <Flex mt="3" gap="3" justify="end">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                        Cancel
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <SendButton/>
                </AlertDialog.Action>
            </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

function SendButton(){
    const { pending } = useFormStatus();
    return (
      <Button color="blue" aria-disabled={pending}>
        Send
      </Button>
    );
}
