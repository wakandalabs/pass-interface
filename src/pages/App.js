import React from 'react';
import {
  Box,
  VStack,
  Grid,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../parts/ColorModeSwitcher';
import { Logo } from '../parts/Logo';
import Providers from "../global/providers.comp";

function App() {
  return (
    <Providers>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo/>
          </VStack>
        </Grid>
      </Box>
    </Providers>
  );
}

export default App;
