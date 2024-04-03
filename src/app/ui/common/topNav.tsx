'use client'
import { Box,Text,Flex} from "@radix-ui/themes"
import { MoonIcon,GitHubLogoIcon } from "@radix-ui/react-icons"
import CreateForm from "./create-form"
import Link from "next/link"
import Search from "./search"
import ThemeButton from "./theme"

export default function TopNav(){
    let placeText = 'Search Plog ...'
    return(
        <main>
            <Box className="w-full" height="8"  position="absolute">
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
                            <CreateForm/>
                            <Link className="hidden md:block sm:block" href={"/plog/sign-board"}>
                              <Text size="2" color="gray">
                                SignBoard
                              </Text>
                            </Link>
                            <Link className="hidden md:block sm:block"  href={"/login"}>
                              <Text size="2" color="gray">
                                  SignIn
                              </Text>
                            </Link>
                            {/* <MoonIcon className="hidden md:block sm:block" height="18" width="18" style={{marginRight:2}} color="gray"/> */}
                            <ThemeButton/>
                            <a href="https://github.com/IsNott">
                            <GitHubLogoIcon className="hidden md:block sm:block" height="18" width="18" style={{marginRight:20}} color="gray"/>
                            </a>
                        </Flex>
                </Flex>
            </Box>
        </main>
    )
}