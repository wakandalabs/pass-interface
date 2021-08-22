import {
  Avatar, Box,
  Button,
  Heading,
  Link, SkeletonCircle, SkeletonText,
  Stack,
  Text,
  useClipboard
} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useProfileHook} from "../../../hooks/use-profile.hook";
import {PROCESSING} from "../../../global/constants";
import {AiOutlineGlobal, AiOutlineMail} from "react-icons/all";

export function About({address}) {
  const {hasCopied, onCopy} = useClipboard(address)
  const profile = useProfileHook(address)

  if (profile.profile === false || profile.profile === null || profile.status === PROCESSING) {
    return <AboutSkeleton />
  }

  return (
    <Stack direction={"row"} spacing={4} pl={4} pr={4} mb={4}>
      <Avatar bg="teal.500"/>
      <Stack>
        <Stack direction={"row"} align={"center"} spacing={4}>
          <Heading fontSize="2xl" bgGradient="linear(to-l, pink.500,cyan)" bgClip="text">{profile.profile.name}</Heading>
          <Stack>
            <Button size={"xs"} onClick={onCopy} width={36} colorScheme={"gray"} color={"gray"}>
              {hasCopied ? "Copied!" : address}
            </Button>
          </Stack>
        </Stack>
        <Text fontSize={"md"} fontWeight={"bold"}>{profile.profile.bio}</Text>
        <Stack direction={"row"} align={"center"}>
          <AiOutlineGlobal/>
          <Text fontSize={"sm"}><Link herf={profile.profile.website}>{profile.profile.website}</Link></Text>
        </Stack>
        <Stack direction={"row"} align={"center"}>
          <AiOutlineMail/>
          <Text fontSize={"sm"}>{profile.profile.email}</Text>
        </Stack>
      </Stack>
    </Stack>
  )
}

export function AboutSkeleton() {
  return (
    <Stack direction={"row"} spacing={4} pl={4} pr={4} mb={4}>
      <SkeletonCircle/>
      <Box w={"100%"}>
        <SkeletonText noOfLines={4} spacing={8}/>
      </Box>
    </Stack>
  )
}

export default function WrappedAbout(props) {
  return (
    <Suspense fallback={<AboutSkeleton/>}>
      <About {...props}/>
    </Suspense>
  )
}