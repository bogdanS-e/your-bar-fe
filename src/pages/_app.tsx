import { AppProps } from "next/app";
import Head from "next/head";

import Layout from "components/Layout";
import GlobalStyle from "styles/globalStyles";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}