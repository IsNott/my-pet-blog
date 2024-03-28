'use client'
import { AlertDialog,Text,Button,Flex,Card,Separator } from "@radix-ui/themes"
import { useFormState,useFormStatus } from "react-dom"
import { doNewPost } from "@/app/lib/action"
export default function CreateForm() {
    const [errorMessage, dispatch] = useFormState(doNewPost, undefined);
    return(
        <AlertDialog.Root>
            {/* 发布按钮 */}
            <AlertDialog.Trigger>
                <Text size="2">
                    New Post
                </Text>
            </AlertDialog.Trigger>
            {/* 正文 */}
            <AlertDialog.Content style={{maxWidth:"500px"}}>
                {/* 标题 */}
                <AlertDialog.Title>New Post</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    What is your mood?
                </AlertDialog.Description>
                <Separator my="3" size="4" />
                <form action={dispatch}>
                    <Card>

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
