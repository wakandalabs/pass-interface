import {
  Avatar,
  Button,
  Heading,
  IconButton,
  Spacer,
  Stack,
  Text,
  useClipboard,
  useDisclosure
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";
import React, {Suspense} from "react";
import {useWakandaProfile} from "../../hooks/use-wakanda-profile";
import {EditProfile} from "../../parts/EditProfile";


export function UserInfoCard({address}) {
  const {hasCopied, onCopy} = useClipboard(address)
  const profile = useWakandaProfile(address)
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <Stack height={"100%"} width={"50%"} p={16} spacing={4}>
      <Avatar bg="teal.500" src={profile.profile.avatar}/>
      <Stack direction={"row"} align={"center"} spacing={2}>
        <Heading fontSize="xl">{profile.profile.name}</Heading>
        <Stack>
          <Button size={"xs"} onClick={onCopy} width={36} colorScheme={"gray"} color={"gray"}>
            {hasCopied ? "Copied!" : address}
          </Button>
        </Stack>
      </Stack>
      <Text>{profile.profile.info}</Text>
      <Spacer/>
      <Stack direction={"row"}>
        <IconButton aria-label={"edit"} icon={<EditIcon/>} onClick={onOpen}/>
        <EditProfile isOpen={isOpen} onClose={onClose}/>
        <Button>Follow</Button>
      </Stack>
    </Stack>
  )
}

export default function WrappedUserInfoCard(props) {
  return (
    <Suspense fallback={null}>
      <UserInfoCard {...props}/>
    </Suspense>
  )
}