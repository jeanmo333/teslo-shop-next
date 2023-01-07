import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import '../styles/globals.css';
import 'react-slideshow-image/dist/styles.css'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';



import { AuthProvider, CartProvider, UiProvider } from '../context';


function MyApp({ Component, pageProps }: AppProps) {

  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  } else {
  return (
      <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>

      
        <SWRConfig 
          value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UiProvider>
                <ThemeProvider theme={ lightTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>

      </PayPalScriptProvider>
  );
        }
}

export default MyApp
