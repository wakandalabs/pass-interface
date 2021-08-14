import {Box} from "@chakra-ui/react";

export function HiddenPass() {
  return (
    <Box>
      Hidden
    </Box>
  )
}

export default function WrappedHiddenPass() {
  return (
    <HiddenPass />
  )
}