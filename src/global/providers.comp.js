import React from 'react';
import {RecoilRoot} from "recoil";
import {HashRouter as Router} from "react-router-dom";
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

export function Providers({children}) {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Router>{children}</Router>
        </ChakraProvider>
      </RecoilRoot>
    </React.StrictMode>
  )
}

export default Providers;
