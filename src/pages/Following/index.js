import React from 'react';
import {Box} from "@chakra-ui/react";

export function Following() {
  return (
    <Box pl={4} pr={4}>
      Following
    </Box>
  );
}

export default function WrappedFollowing() {
  return (
    <Following/>
  )
}