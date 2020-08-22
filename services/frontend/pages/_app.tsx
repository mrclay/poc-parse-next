import '../styles/globals.css';
import { withTina } from 'tinacms';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTina(MyApp, {
  enabled: false,
});
