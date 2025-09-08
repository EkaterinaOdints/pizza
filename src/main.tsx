import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

import App from './components/App/App.js';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <StrictMode>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </StrictMode>,
  )
}

