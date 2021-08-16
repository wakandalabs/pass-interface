import {Box} from "@chakra-ui/react";

export function CreatedPass({address}) {
  return (
    <Box>
      Created
    </Box>
  )
}

export default function WrappedCreatedPass(props) {
  return (
    <CreatedPass {...props}/>
  )
}