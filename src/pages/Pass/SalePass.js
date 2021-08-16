import {Box} from "@chakra-ui/react";

export function SalePass({address}) {
  return (
    <Box h={500}>
    Sale, {address}
    </Box>
  )
}

export default function WrappedSalePass(props) {
  return (
    <SalePass {...props}/>
  )
}