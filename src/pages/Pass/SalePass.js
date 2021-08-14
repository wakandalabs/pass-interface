import {Box} from "@chakra-ui/react";

export function SalePass() {
  return (
    <Box h={500}>
    Sale
    </Box>
  )
}

export default function WrappedSalePass() {
  return (
    <SalePass />
  )
}