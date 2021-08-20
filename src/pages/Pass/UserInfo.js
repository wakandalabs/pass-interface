import {
  Avatar,
  Button,
  Heading,
  IconButton, Link, Skeleton, SkeletonCircle,
  Spacer,
  Stack,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";
import React, {Suspense} from "react";
import {useProfileHook} from "../../hooks/use-profile.hook";
import {useHistory} from "react-router-dom";
import {PROCESSING} from "../../global/constants";
import {AiOutlineGlobal, AiOutlineMail} from "react-icons/all";

export function UserInfo({address}) {
  const {hasCopied, onCopy} = useClipboard(address)
  const profile = useProfileHook(address)
  const history = useHistory()

  if (profile.profile === false || profile.profile === null || profile.status === PROCESSING) {
    return <UserInfoSkeleton />
  }

  return (
    <Stack height={"100%"} p={16} spacing={6} minH={"60vh"}>
      <Avatar bg="teal.500"/>
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

      <Spacer/>
      <Stack direction={"row"} spacing={6}>
        <IconButton aria-label={"edit"} icon={<EditIcon/>} onClick={() => history.push("/setting")}/>
        <Button>Follow</Button>
      </Stack>
    </Stack>
  )
}

export function UserInfoSkeleton() {
  const history = useHistory()
  return (
    <Stack height={"100%"} p={16} spacing={6} minH={"60vh"}>
      <SkeletonCircle size="12" startColor="pink.500" endColor="orange.500"/>
      <Stack direction={"row"} align={"center"} spacing={4}>
        <Skeleton w={"100px"} h={"30px"}/>
        <Skeleton w={"200px"} h={"30px"}/>
      </Stack>
      <Skeleton h={"20px"}/>
      <Skeleton h={"20px"}/>
      <Skeleton h={"20px"} w={"200px"}/>
      <Spacer/>
      <Stack direction={"row"} spacing={6}>
        <IconButton aria-label={"edit"} icon={<EditIcon/>} onClick={() => history.push("/setting")}/>
        <Button>Follow</Button>
      </Stack>
    </Stack>
  )
}

export default function WrappedUserInfoCard(props) {
  return (
    <Suspense fallback={<UserInfoSkeleton/>}>
      <UserInfo {...props}/>
    </Suspense>
  )
}

