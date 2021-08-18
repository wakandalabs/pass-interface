import {
  Box,
  Button, Center, FormControl, FormLabel, Heading, Input, Stack,
} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaProfile} from "../../hooks/use-wakanda-profile";
import {useCurrentUser} from "../../hooks/use-current-user";
import {PROCESSING} from "../../global/constants";

export function Setting() {
  const [cu, loggedIn] = useCurrentUser()
  const profile = useWakandaProfile(cu.addr)
  const [name, setName] = React.useState("")
  const [avatar, setAvatar] = React.useState("")
  const [color, setColor] = React.useState("")
  const [bio, setBio] = React.useState("")
  const [website, setWebsite] = React.useState("")
  const [email, setEmail] = React.useState("")

  if (!loggedIn || profile.profile === null) {
    return (
      <SettingSkeleton/>
    )
  }

  function getProfile() {
    setName(profile.profile.name)
    setAvatar(profile.profile.avatar)
    setColor(profile.profile.color)
    setBio(profile.profile.bio)
    setWebsite(profile.profile.website)
    setEmail(profile.profile.email)
  }

  return (
    <Center>
      <Stack pl={4} pr={4} spacing={12} w={650} minH={"60vh"}>
        <Box mb={8}>
          <Heading>Edit profile</Heading>
        </Box>
        <Button onClick={() => getProfile()} variant={"outline"} fontWeight={"bold"} size={"lg"}>
          Edit from current profile
        </Button>
        <FormControl id="avatar">
          <FormLabel fontWeight={"bold"}>Avatar</FormLabel>
          <Input placeholder="" size="md" variant={"flushed"}
                 disabled={profile.status === PROCESSING}
                 value={avatar} onChange={(event) => setAvatar(event.target.value)}/>
        </FormControl>
        <FormControl id="name">
          <FormLabel fontWeight={"bold"}>Display name</FormLabel>
          <Input placeholder="Enter your display name" size="md" isInvalid={name.length > 15 || name.length <= 0}
                 isRequired={true} variant={"flushed"}
                 disabled={profile.status === PROCESSING}
                 value={name} onChange={(event) => setName(event.target.value)}/>
        </FormControl>
        <FormControl id="bio">
          <FormLabel fontWeight={"bold"}>Bio</FormLabel>
          <Input placeholder="Tell about yourself in a few words" size="md"
                 isInvalid={bio.length > 280 || bio.length <= 0}
                 isRequired={true} variant={"flushed"}
                 disabled={profile.status === PROCESSING}
                 value={bio} onChange={(event) => setBio(event.target.value)}/>
        </FormControl>
        <FormControl id="website">
          <FormLabel fontWeight={"bold"}>Website</FormLabel>
          <Input placeholder="https://" size="md" isInvalid={website.length > 40}
                 disabled={profile.status === PROCESSING} variant={"flushed"}
                 value={website} onChange={(event) => setWebsite(event.target.value)}/>
        </FormControl>
        <FormControl id="email">
          <FormLabel fontWeight={"bold"}>Email</FormLabel>
          <Input placeholder="Enter your email" size="md" isInvalid={email.length > 40}
                 disabled={profile.status === PROCESSING} variant={"flushed"}
                 value={email} onChange={(event) => setEmail(event.target.value)}/>
        </FormControl>
        <Button
          disabled={(name.length > 15 || name.length <= 0) || (bio.length > 280 || bio.length <= 0) || (website.length > 40) || (email.length > 40)}
          isLoading={profile.status === PROCESSING} loadingText={"Updating"} fontWeight={"bold"} size={"lg"}
          onClick={() => profile.update(name, avatar, color, bio, website, email)}>Update profile</Button>
      </Stack>
    </Center>
  )
}

export function SettingSkeleton() {
  return (
    <Center>
      <Stack pl={4} pr={4} spacing={6} w={650} minH={"60vh"}>
        <Heading>Edit profile</Heading>
        <Heading fontSize={"xl"} color={"gray"}>You can set preferred display name and manage other personal settings
        </Heading>
        <FormControl id="avatar">
          <FormLabel>Avatar</FormLabel>
          <Input placeholder="" size="md" disabled/>
        </FormControl>
        <FormControl id="name">
          <FormLabel>Display name</FormLabel>
          <Input placeholder="Enter your display name" size="md" disabled/>
        </FormControl>
        <FormControl id="bio">
          <FormLabel>Bio</FormLabel>
          <Input placeholder="Tell about yourself in a few words" size="md" disabled/>
        </FormControl>
        <FormControl id="website">
          <FormLabel>Website</FormLabel>
          <Input placeholder="https://" size="md" disabled/>
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter your email" size="md" disabled/>
        </FormControl>
        <Button isLoading loadingText={"Loading profile"} size={"lg"}/>
      </Stack>
    </Center>
  )
}

export default function WrappedSetting() {
  return (
    <Suspense fallback={<SettingSkeleton/>}>
      <Setting/>
    </Suspense>
  )
}