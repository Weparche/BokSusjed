import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import { BoksusjedProvider } from './context/BoksusjedContext';
import './index.css';
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BoksusjedProvider>
        <App />
      </BoksusjedProvider>
    </BrowserRouter>
  </StrictMode>,
);

registerSW({ immediate: true });
