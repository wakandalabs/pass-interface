import {Box} from "@chakra-ui/react";

export function HiddenPass({address}) {
  return (
    <Box>
      Hidden
    </Box>
  )
}

export default function WrappedHiddenPass(props) {
  return (
    <HiddenPass {...props}/>
  )
}