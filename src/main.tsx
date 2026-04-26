import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.css';

import { RouterProvider } from 'react-router';
import { router } from '@/router/router';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root Element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
