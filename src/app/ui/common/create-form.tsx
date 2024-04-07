'use client'
import { AlertDialog,Text,Button,Flex,Card,Separator,Strong,TextField,TextArea, Box } from "@radix-ui/themes"
import { useFormState,useFormStatus } from "react-dom"
import { doNewPost } from "@/app/lib/action"
import Link from "next/link"
import UploadImage from "./upload-form"
import { useEffect, useState } from "react"

type Plog = {
  senderId: string | null,
  title: string | null,
  context: string | null,
  imgs: string | null
}

export default function CreateForm() {
    const [errorMessage, dispatch] = useFormState(doNewPost, undefined);
    const [plog,setPlog] = useState<Plog>({
      senderId: localStorage.getItem('plog.senderId'),
      title: localStorage.getItem('plog.title'),
      context: localStorage.getItem('plog.context'),
      imgs: localStorage.getItem('plog.imges')
    })

    const handleChange = (e) => {
      setPlog(prev => ({
        ...prev,
        [e.target.name] : e.target.value
      }))
    }

    const handleCancel = () => {
      Object.keys(plog).forEach(key => {
        const value = plog[key];
        // 检查值是否为 null 或 undefined，如果不是，则存储到 LocalStorage 中
        if (value !== null && value !== undefined) {
          localStorage.setItem('plog.'+ key, value);
        }
      })
    }

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
                            <input style={{display: 'none'}} name='senderId'  onChange={handleChange} value={plog.senderId ? plog.senderId : ''}></input>
                            <Flex direction="column" gap="3">
                                <Text><Strong>Title</Strong></Text>
                                <Separator size="4"/>
                                <TextField.Input name="title" onChange={handleChange} value={plog.title ? plog.title : ''} placeholder="Type something…">
                                </TextField.Input>
                            </Flex>
                            <Flex direction="column" gap="3">
                                <Text><Strong>Context</Strong></Text>
                                <Box style={{width:"300"}}>
                                    <TextArea name="context" size="2"  onChange={handleChange} value={plog.context ? plog.context : ''} placeholder="Type something…" />
                                </Box>
                            </Flex>
                            <Flex direction="column" gap="3">
                                <Text><Strong>Images</Strong></Text>
                                <UploadImage/>
                            </Flex>
                            <input style={{display:'none'}} name="imgs" value={plog.imgs ? plog.imgs : ''}></input>
                        </Flex>
                    </Card>
                </form>
            <Flex mt="3" gap="3" justify="end">
                <AlertDialog.Cancel onClick={handleCancel}>
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
