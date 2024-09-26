import { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from 'components/Layout';
import GlobalStyle from 'styles/globalStyles';
import { useState } from 'react';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import useStore from 'store';
import { IIngredient } from 'types/ingredient';
import { ICocktail } from 'types/cocktail';
import { Auth0Provider } from '@auth0/auth0-react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { updateIngredients, updateCocktails } = useStore();

  const queryCache = new QueryCache({
    onSuccess: (data, query) => {
      if (JSON.stringify(query.queryKey) === JSON.stringify(['ingredients'])) {
        updateIngredients(data as IIngredient[]);

        return;
      }

      if (JSON.stringify(query.queryKey) === JSON.stringify(['cocktails'])) {
        updateCocktails(data as ICocktail[]);
      }
    },
  });

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
        queryCache,
      })
  );
  // display?: 'page' | 'popup' | 'touch' | 'wap';
  //
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="Your bar" />
        <meta property="og:url" content="https://your-bar-fe.onrender.com" />
        <meta
          name="google-site-verification"
          content="lQBCPlJVvkLKiNa2Ex2BjEANdAWvNyT8V8cmL7x1Nec"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />

      {/* when there is no error status code will be undefined  */}
      {pageProps.statusCode ? (
        <Component {...pageProps} />
      ) : (
        <Auth0Provider
          domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
          clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
          authorizationParams={{
            redirect_uri: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENTCE,
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth0Provider>
      )}

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
