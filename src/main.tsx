import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';
import App from '@/App';

import { BrowserRouter } from 'react-router';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root Element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
