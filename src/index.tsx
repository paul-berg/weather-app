import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import { App } from './components/App/App';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store'; 
import ErrorBoundary from './components/ErrorBoundary';
import { CircularProgress} from '@material-ui/core';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <GoogleOAuthProvider clientId="626710636251-5g916rvn2vnipsj7qntqjqdmvuc6hojd.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<CircularProgress />} persistor={persistor}>
            <ErrorBoundary>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
              </ErrorBoundary>
          </PersistGate> 
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>

);


