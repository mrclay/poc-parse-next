import { AppProps } from "next/app";

import "../styles/globals.css";
import "../components/Playground/style.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
