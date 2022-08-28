import '../styles/globals.css';
import type { AppProps } from 'next/app';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
// @ts-ignore
import jwt from 'jsonwebtoken';

function MyApp({ Component, pageProps }: AppProps) {
  const { connect } = useAuth();

  // @ts-ignore
  useEffect(async () => {
    const cachedToken = localStorage.getItem('token');

    if (cachedToken) {
      const expiry = jwt.decode(cachedToken)['exp'];
      if (expiry > Math.round(new Date().getTime() / 1000)) {
        await connect();
      } else {
        localStorage.removeItem('token');
      }
    } else {
      await connect();
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
