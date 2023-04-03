import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux'
// import { ErrorBoundary } from './components/ErrorBoundary';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import { App } from './components/App/App';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store'; 
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme} from '@material-ui/core';

type Spacing = (n: number, m?: number) => string
// spacing: 
declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    spacing: Spacing
  }

  interface ThemeOptions {
    pallete?: {
      primary?: {
        main?: string;
      }
    };
  }
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  spacing: [0, 4, 8, 16, 32, 64],
  pallete: {
    primary: {
      main: '#282c34'
    }
  }
})

root.render(
  <GoogleOAuthProvider clientId="626710636251-5g916rvn2vnipsj7qntqjqdmvuc6hojd.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>          
            <ErrorBoundary>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
              </ErrorBoundary>
            </ThemeProvider>
          </PersistGate> 
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
