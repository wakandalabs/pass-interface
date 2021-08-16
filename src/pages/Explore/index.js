import React from 'react';
import {Box} from "@chakra-ui/react";

export function Explore() {
  return (
    <Box pl={4} pr={4}>
      Explore
    </Box>
  );
}

export default function WrappedExplore() {
  return (
    <Explore/>
  )
}