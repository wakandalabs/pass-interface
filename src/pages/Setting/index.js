import {
  Button, Center, FormControl, FormLabel, Heading, Input, Stack,
} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaProfile} from "../../hooks/use-wakanda-profile";
import {useCurrentUser} from "../../hooks/use-current-user";

export function Setting() {
  const [cu, loggedIn] = useCurrentUser()
  const profile = useWakandaProfile(cu.addr)
  const [name, setName] = React.useState(profile.profile.name)
  const [avatar, setAvatar] = React.useState(profile.profile.avatar)
  const [color, setColor] = React.useState(profile.profile.color)
  const [bio, setBio] = React.useState(profile.profile.bio)
  const [website, setWebsite] = React.useState(profile.profile.website)
  const [email, setEmail] = React.useState(profile.profile.email)

  if (!loggedIn) {
    return (
      <SettingSkeleton />
    )
  }

  return (
    <Center>
      <Stack pl={4} pr={4} spacing={6} w={650} minH={"60vh"}>
        <Heading>Edit profile</Heading>
        <Heading fontSize={"xl"} color={"gray"}>You can set preferred display name and manage other personal settings
        </Heading>
        <FormControl id="avatar">
          <FormLabel>Avatar</FormLabel>
          <Input placeholder="" size="md" value={avatar} onChange={(event) => setAvatar(event.target.value)}/>
        </FormControl>
        <FormControl id="name">
          <FormLabel>Display name</FormLabel>
          <Input placeholder="Enter your display name" size="md" isInvalid={name.length > 15 || name.length <= 0}
                 isRequired={true}
                 value={name} onChange={(event) => setName(event.target.value)}/>
        </FormControl>
        <FormControl id="bio">
          <FormLabel>bio</FormLabel>
          <Input placeholder="Tell about yourself in a few words" size="md"
                 isInvalid={bio.length > 280 || bio.length <= 0}
                 isRequired={true}
                 value={bio} onChange={(event) => setBio(event.target.value)}/>
        </FormControl>
        <FormControl id="website">
          <FormLabel>Website</FormLabel>
          <Input placeholder="https://" size="md" isInvalid={website.length > 40}
                 value={website} onChange={(event) => setWebsite(event.target.value)}/>
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter your email" size="md" isInvalid={email.length > 40}
                 value={email} onChange={(event) => setEmail(event.target.value)}/>
        </FormControl>
        <Button
          disabled={(name.length > 15 || name.length <= 0) || (bio.length > 280 || bio.length <= 0) || (website.length > 40) || (email.length > 40)}
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
        <Button isLoading loadingText={"Loading profile"}/>
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