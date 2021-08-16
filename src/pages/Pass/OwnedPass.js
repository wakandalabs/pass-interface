import {Box} from "@chakra-ui/react";

export function OwnedPass({address}) {
  return (
    <Box>
      Owned
    </Box>
  )
}

export default function WrappedOwnedPass(props) {
  return (
    <OwnedPass {...props}/>
  )
}