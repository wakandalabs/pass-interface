import {Box} from "@chakra-ui/react";

export function CreatedPass() {
  return (
    <Box>
      Created
    </Box>
  )
}

export default function WrappedCreatedPass() {
  return (
    <CreatedPass />
  )
}