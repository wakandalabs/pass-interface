import {Box} from "@chakra-ui/react";

export function LikedPass({address}) {
  return (
    <Box>
      Liked Pass
    </Box>
  )
}

export default function WrappedLikedPass(props) {
  return (
    <LikedPass {...props}/>
  )
}