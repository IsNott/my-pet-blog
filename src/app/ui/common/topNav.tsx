'use client'
import { Container,Box,Text,Flex,TextField,Avatar} from "@radix-ui/themes"
import { HomeIcon,MagnifyingGlassIcon,GitHubLogoIcon } from "@radix-ui/react-icons"
import Image from "next/image"
export default function TopNav(){
    return(
        <main>
            <Box width="100%" height="8"  position="absolute">
                <Flex align="center" height="100%" justify="between" direction="row" >
                        <Text ml="5" color="gray" weight="bold">
                            Little Dog Book
                        </Text>
                    
                    <Flex align="center" mr="5" justify="between" gap="3">
                        <Text color="gray">
                            Sign In
                        </Text>
                        <GitHubLogoIcon color="gray"/>
                    </Flex>
                </Flex>

            </Box>
        </main>
    )
}