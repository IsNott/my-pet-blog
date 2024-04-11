"use client";
import { Box, Text, Flex } from "@radix-ui/themes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import CreateForm from "./create-form";
import Link from "next/link";
import Search from "./search";
import ThemeButton from "./theme";
import PlogPage from "@/app/router/router";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export default function TopNav() {
  const { data }: { data: any } = useSession();
  console.log("data:", data);

  const token = data?.token;
  let placeText = "Search Plog ...";
  const title = process.env.REACT_APP_TITLE;
  return (
    <main>
      <Box className="w-full" height="8" position="absolute">
        <Flex align="center" height="100%" justify="between" direction="row">
          <Link href={PlogPage.Plog}>
            <Text ml="5" color="gray" weight="bold">
              {/* {title} */}
              Litter Dog Book
            </Text>
          </Link>
          <Search placeholder={placeText} />
          <Flex align="center" mr="5" justify="between" gap="5">
            {/* 创建post */}
            {token && <CreateForm userId={token.sub} />}
            <Link
              className="hidden md:block sm:block"
              href={PlogPage.SignBoard}
            >
              <Text size="2" color="gray">
                SignBoard
              </Text>
            </Link>
            <Link className="hidden md:block sm:block" href={PlogPage.Login}>
              <Text size="2" color="gray">
                SignIn
              </Text>
            </Link>
            {/* 修改主题按钮 */}
            <ThemeButton />
            <a href={PlogPage.NottGitHub}>
              <GitHubLogoIcon
                className="hidden md:block sm:block"
                height="18"
                width="18"
                style={{ marginRight: 20 }}
                color="gray"
              />
            </a>
          </Flex>
        </Flex>
      </Box>
    </main>
  );
}
