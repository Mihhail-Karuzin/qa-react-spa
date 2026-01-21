import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// 🔑 Read environment flag
const isMswDisabled = import.meta.env.VITE_DISABLE_MSW === 'true';

async function prepareApp() {
  // Start MSW ONLY when NOT disabled
  if (import.meta.env.DEV && !isMswDisabled) {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

prepareApp().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
