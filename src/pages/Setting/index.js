import {
  Box,
  Button, Center, FormControl, FormLabel, Heading, Input, Stack,
} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {useWakandaProfileHook} from "../../hooks/use-wakanda-profile.hook";
import {useCurrentUserHook} from "../../hooks/use-current-user.hook";
import {PROCESSING} from "../../global/constants";

export function Setting() {
  const [cu, loggedIn] = useCurrentUserHook()
  const profile = useWakandaProfileHook(cu.addr)
  const [post, setPost] = React.useState({"name": "", "avatar": "", "color": "", "bio": "", "website": "", "email": ""})

  if (!loggedIn || profile.profile === null) {
    return (
      <SettingSkeleton/>
    )
  }

  function getProfile() {
    setPost({
      "name": profile.profile.name,
      "avatar": profile.profile.avatar,
      "color": profile.profile.color,
      "bio": profile.profile.bio,
      "website": profile.profile.website,
      "email": profile.profile.email
    })
  }

  console.log(profile.status)

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
                 disabled={profile.status === PROCESSING} value={post.avatar}
                 onChange={(e) => setPost({...post, avatar: e.target.value})}/>
        </FormControl>
        <FormControl id="name">
          <FormLabel fontWeight={"bold"}>Display name</FormLabel>
          <Input placeholder="Enter your display name" size="md" isInvalid={post.name.length > 15 || post.name.length <= 0}
                 isRequired={true} variant={"flushed"} value={post.name}
                 disabled={profile.status === PROCESSING}
                 onChange={(e) => setPost({...post, name: e.target.value})}/>
        </FormControl>
        <FormControl id="bio">
          <FormLabel fontWeight={"bold"}>Bio</FormLabel>
          <Input placeholder="Tell about yourself in a few words" size="md"
                 isInvalid={post.bio.length > 280 || post.bio.length <= 0}
                 isRequired={true} variant={"flushed"} value={post.bio}
                 disabled={profile.status === PROCESSING}
                 onChange={(e) => setPost({...post, bio: e.target.value})}/>
        </FormControl>
        <FormControl id="website">
          <FormLabel fontWeight={"bold"}>Website</FormLabel>
          <Input placeholder="https://" size="md" isInvalid={post.website.length > 40}
                 disabled={profile.status === PROCESSING} variant={"flushed"} value={post.website}
                 onChange={(e) => setPost({...post, website: e.target.value})}/>
        </FormControl>
        <FormControl id="email">
          <FormLabel fontWeight={"bold"}>Email</FormLabel>
          <Input placeholder="Enter your email" size="md" isInvalid={post.email.length > 40}
                 disabled={profile.status === PROCESSING} variant={"flushed"} value={post.email}
                 onChange={(e) => setPost({...post, email: e.target.value})}/>
        </FormControl>
        <Button
          disabled={(post.name.length > 15 || post.name.length <= 0) || (post.bio.length > 280 || post.bio.length <= 0) || (post.website.length > 40) || (post.email.length > 40)}
          isLoading={profile.status === PROCESSING} loadingText={"Updating"} fontWeight={"bold"} size={"lg"} colorScheme={"cyan"}
          onClick={() => profile.update(post)}>Update profile</Button>
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
        <Button isLoading loadingText={"Loading profile"} size={"lg"} colorScheme={"cyan"}/>
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