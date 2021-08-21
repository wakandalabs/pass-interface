import {Divider, Grid, Heading, Link, Select, Spacer, Stack, Text} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {AiOutlineGithub, AiOutlineTaobao, AiOutlineTwitter} from "react-icons/all";

export function TheFooter() {
  return (
    <Stack p={4} mt={20} bgColor={"transparent"} backdropFilter={"blur(8px)"}>
      <Divider/>
      <Grid templateColumns="repeat(4, 1fr)" gap={3} pb={20} pt={20}>
        Wakanda Labs
        <Stack w="100%" spacing={6}>
          <Heading fontSize={"md"}>World of Wakanda</Heading>
          <Heading fontSize={"md"} color={"gray.500"}>
            <Link href={"/"}>Explore</Link>
          </Heading>
          <Heading fontSize={"md"} color={"gray.500"}>
            <Link href={"/pass"}>My pass</Link>
          </Heading>
          <Heading fontSize={"md"} color={"gray.500"}>
            <Link href={"/following"}>Following</Link>
          </Heading>

        </Stack>
        <Stack w="100%" spacing={6}>
          <Heading fontSize={"md"}>Community</Heading>
          <Heading fontSize={"md"} color={"gray.500"}>
            <Link href={"/wkdt"}>WKDT Token</Link>
          </Heading>
          <Heading fontSize={"md"} color={"gray.500"}>Voting</Heading>
          <Heading fontSize={"md"} color={"gray.500"}>Suggest feature</Heading>
        </Stack>
        <Stack w="100%" spacing={3}>
          <Heading fontSize={"md"}>Language</Heading>
          <Select variant="filled">
            <option value="english">English</option>
            {/*<option value="chinese">中文</option>*/}
          </Select>
        </Stack>
      </Grid>
      <Divider/>
      <Stack direction={"row"} align={"center"} spacing={4}>
        <Text fontSize={"md"}>© Wakanda Labs. All rights reserved.</Text>
        <Spacer/>
        <Link href={"https://github.com/wakandalabs/"}><AiOutlineGithub size={20}/></Link>
        <Link href={"https://twitter.com/wakandalabs/"}><AiOutlineTwitter size={20}/></Link>
        <Link href={"http://wakanda.cn/"}><AiOutlineTaobao size={20}/></Link>
      </Stack>
    </Stack>
  )
}

export function TheFooterSkeleton() {
  return null
}


export default function WrappedTheFooter() {
  return (
    <Suspense fallback={<TheFooterSkeleton/>}>
      <TheFooter/>
    </Suspense>
  )
}