import { AppProps } from 'next/app';
import 'flatpickr/dist/themes/airbnb.css';
import 'modern-normalize/modern-normalize.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
