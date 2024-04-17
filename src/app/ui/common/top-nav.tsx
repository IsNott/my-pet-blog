"use client";
import { Box, Text, Flex } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import CreateForm from "./create-form";
import Link from "next/link";
import Search from "./search";
import ThemeButton from "./theme";
import PlogPage from "@/app/router/router";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname()
  const { data }: { data: any } = useSession();
  const token = data?.session;
  let placeText = "Search Plog ...";
  const title = process.env.REACT_APP_TITLE;
  return (
    <main>
      <Box className="w-full" height="9" position="absolute">
        <Flex align="center" height="100%" justify="between" direction="row">
          <Link href={PlogPage.Plog}>
            <Text ml="9" mr="9" color="gray" size="6" weight="bold">
              {/* {title} */}
              Litter Dog Book
            </Text>
          </Link>
          {PlogPage.MyDashBorad != pathname && <Search placeholder={placeText} />}
          <Flex align="center" mr="5" justify="between" gap="5">
            {/* 创建post */}
            {token && <CreateForm userId={token.sub} />}
            <Link
              className="hidden md:block sm:block"
              href={PlogPage.SignBoard}
            >
              <Text size="4" color="gray">
                SignBoard
              </Text>
            </Link>
            {!token && (
              <Link className="hidden md:block sm:block" href={PlogPage.Login}>
                <Text size="4" color="gray">
                  SignIn
                </Text>
              </Link>
            )}
            {token && (
              <Link
                className="hidden md:block sm:block"
                href={PlogPage.MyDashBorad}
              >
                <Text size="4" color="gray">
                  {token.name}
                </Text>
              </Link>
            )}
            {/* 修改主题按钮 */}
            <ThemeButton />
            <a href={PlogPage.NottGitHub}>
              <GitHubLogoIcon
                className="hidden md:block sm:block mr-16"
                height="28"
                width="28"
                // style={{ marginRight: 24 }}
                color="gray"
              />
            </a>
          </Flex>
        </Flex>
      </Box>
    </main>
  );
}
