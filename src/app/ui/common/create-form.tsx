'use client'
import { AlertDialog,Text,Button,Flex,Card,Separator,Strong,TextField,TextArea, Box } from "@radix-ui/themes"
import { useFormState,useFormStatus } from "react-dom"
import { doNewPost } from "@/app/lib/action"
import Link from "next/link"
import UploadImage from "./upload-form"
import { useState } from "react"

export default function CreateForm() {
    const [errorMessage, dispatch] = useFormState(doNewPost, undefined);
    const [imgIds,setImgIds] = useState<Array<string>>([])
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
                            <input style={{display: 'none'}} name='senderId' defaultValue={'1'}></input>
                            <Flex direction="column" gap="3">
                                <Text><Strong>Title</Strong></Text>
                                <Separator size="4"/>
                                <TextField.Input name="title" defaultValue={''} placeholder="Type something…">
                                </TextField.Input>
                            </Flex>
                            <Flex direction="column" gap="3">
                                <Text><Strong>Context</Strong></Text>
                                <Box style={{width:"300"}}>
                                    <TextArea name="context" size="2" defaultValue={''} placeholder="Type something…" />
                                </Box>
                            </Flex>
                            <Flex direction="column" gap="3">
                                <Text><Strong>Images</Strong></Text>
                                <UploadImage/>
                            </Flex>
                            <input style={{display:'none'}} name="imgs" value={imgIds}></input>
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
      <Button type="submit" color="blue" aria-disabled={pending}>
        Send
      </Button>
    );
}
