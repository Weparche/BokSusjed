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

if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  void navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => void registration.unregister());
  });
}

if (import.meta.env.PROD) {
  registerSW({ immediate: true });
}
