import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './app/store';
import { Loader2 } from 'lucide-react';

const PersistLoader = () => (
  <div className='fixed z-50 top-0 left-0 bg-background flex items-center justify-center w-full h-screen'>
    <Loader2 className='w-8 h-8 animate-spin text-primary' />
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<PersistLoader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
