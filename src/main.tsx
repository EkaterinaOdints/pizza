import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "@/components/ui/provider"

import App from './components/App/App.js';

const rootEl = document.getElementById('root');

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>,
  )
}

