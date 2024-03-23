'use client'
import { Box,Text,Flex,TextField,Avatar} from "@radix-ui/themes"
import { MoonIcon,MagnifyingGlassIcon,GitHubLogoIcon } from "@radix-ui/react-icons"
export default function TopNav(){
    return(
        <main>
            <Box width="100%" height="8"  position="absolute">
                <Flex align="center" height="100%" justify="between" direction="row" >
                        <Text ml="5" color="gray" weight="bold">
                            Little Dog Book
                        </Text>
                        <TextField.Root>
                            <TextField.Input size="2" radius="small" placeholder="Search the Plog..." />
                            <TextField.Slot>
                            <MagnifyingGlassIcon height="14" width="14" />
                            </TextField.Slot>
                        </TextField.Root>
                        <Flex align="center" mr="5" justify="between" gap="3">
                            <Text color="gray">
                                Sign In
                            </Text>
                            <MoonIcon height="18" width="18" style={{marginRight:2}} color="gray"/>
                            <GitHubLogoIcon height="18" width="18" style={{marginRight:20}} color="gray"/>
                        </Flex>
                </Flex>

            </Box>
        </main>
    )
}