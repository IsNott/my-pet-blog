'use client'
import { Box,Text,Flex,TextField} from "@radix-ui/themes"
import { MoonIcon,MagnifyingGlassIcon,GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Search from "./search"

export default function TopNav(){
    let placeText = 'Search Plog ...'
    return(
        <main>
            <Box width="100%" height="8"  position="absolute">
                <Flex align="center" height="100%" justify="between" direction="row" >
                        <Link href="/plog">
                          <Text ml="5" color="gray" onClick={()=>{
                            placeText = "Search Plog ..."
                          }} weight="bold">
                              Little Dog Book
                          </Text>
                        </Link>
                        <Search placeholder={placeText}/>
                        <Flex align="center" mr="5" justify="between" gap="5">
                            <Text size="2">
                              New Post
                            </Text>
                            <Link href={"/plog/sign-board"}>
                              <Text size="2" color="gray">
                                SignBoard
                              </Text>
                            </Link>
                            <Text size="2" color="gray">
                                SignIn
                            </Text>
                            <MoonIcon height="18" width="18" style={{marginRight:2}} color="gray"/>
                            <a href="https://github.com/IsNott">
                            <GitHubLogoIcon height="18" width="18" style={{marginRight:20}} color="gray"/>
                            </a>
                        </Flex>
                </Flex>

            </Box>
        </main>
    )
}