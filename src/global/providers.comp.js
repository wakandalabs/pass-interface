import React from 'react';
import {RecoilRoot} from "recoil";
import {HashRouter as Router} from "react-router-dom";
import {
  Box,
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

export function Providers({children}) {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Router>
            <Box pt={24}>
              {children}
            </Box>
          </Router>
        </ChakraProvider>
      </RecoilRoot>
    </React.StrictMode>
  )
}

export default Providers;
