'use client'
import { AlertDialog,Text,Button,Flex,Card,Separator,Strong,TextField,TextArea, Box } from "@radix-ui/themes"
import { useFormState,useFormStatus } from "react-dom"
import { doNewPost } from "@/app/lib/action"
import Link from "next/link"
import UploadImage from "./upload-form"
import { useEffect, useState } from "react"
import { parseLocalStorgeObj } from '@/app/lib/utils'

type Plog = {
  senderId: string | null,
  title: string | null,
  context: string | null,
  imgs: string[] | null
}

const defObj : Plog = {
    senderId: '',
    title:'',
    context:'',
    imgs: []
}

export default function CreateForm() {
    const initialState = { message: null,erros:{}}
    const ISSERVER = typeof window === "undefined";
    const [state, dispatch] = useFormState(doNewPost, initialState);
    const [plog,setPlog] = useState<Plog>({...defObj})
    const [loding,setLoding] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPlog(prev => ({
        ...prev,
        [e.target.name] : e.target.value
      }))
    }

    useEffect(()=>{
        setLoding(true)
        setPlog(() : Plog =>{
            for (const key in defObj) {
                if (Object.prototype.hasOwnProperty.call(defObj, key)) {
                    // 使用键（key）来给对象赋值
                    defObj[key] = parseLocalStorgeObj(ISSERVER,`plog.${key}`,true,null);
                }
            }
            return defObj
        })
        setLoding(false)
    },[])

    const handleCancel = () => {
      Object.keys(plog).forEach(key => {
        // 声明key为plog属性的类型
        const typedKey = key as keyof typeof plog;
        const value = plog[typedKey];
        if (value !== null && value !== undefined) {
            localStorage.setItem('plog.'+ key, JSON.stringify(value));
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
                            <input style={{display: 'none'}} name='senderId' onChange={handleChange} value={plog.senderId || ''}></input>
                            <Flex direction="column" gap="3">
                                <Text><Strong>Title</Strong></Text>
                                <Separator size="4"/>
                                <TextField.Input name="title" 
                                    aria-describedby="title-error"
                                    onChange={handleChange} 
                                    value={plog.title || ''} 
                                    placeholder="Type something…">
                                </TextField.Input>
                                <div id='title-error'>
                                    {state.errors?.title &&
                                        state.errors?.title.map((error: string) => (
                                            <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                            </p>
                                        ))}
                                </div>
                            </Flex>
                            <Flex direction="column" gap="3">
                                <Text><Strong>Context</Strong></Text>
                                <Box style={{width:"300"}}>
                                  <TextArea name="context" size="2"
                                  aria-describedby="context-error"
                                  onChange={handleChange} 
                                  value={plog.context || ''} 
                                  placeholder="Type something…" />
                                </Box>
                                <div id='context-error'>
                                    {state.errors?.context &&
                                        state.errors?.context.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                    </p>
                                 ))}
                                </div>
                            </Flex>
                            <Flex direction="column" gap="3">
                                <Text><Strong>Images</Strong></Text>
                                    <UploadImage preImgs={plog.imgs}/>
                            </Flex>
                            <input 
                            style={{display:'none'}} 
                            name="imgs" 
                            aria-describedby="imgs-error"
                            value={plog.imgs || ''}>
                            </input>
                        </Flex>
                        <div id='imgs-error'>
                            {state.errors?.imgs &&
                                state.errors?.imgs.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                    </p>
                                ))}
                        </div>
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
