import {Box} from "@chakra-ui/react";

export function LikedPass() {
  return (
    <Box>
      Liked Pass
    </Box>
  )
}

export default function WrappedLikedPass() {
  return (
    <LikedPass />
  )
}