import {Box} from "@chakra-ui/react";

export function OwnedPass() {
  return (
    <Box>
      Owned
    </Box>
  )
}

export default function WrappedOwnedPass() {
  return (
    <OwnedPass />
  )
}