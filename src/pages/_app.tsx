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

export default function MyApp({ Component, pageProps }: AppProps) {
  const { updateIngredients } = useStore();

  const queryCache = new QueryCache({
    onSuccess: (data, query) => {
      if (JSON.stringify(query.queryKey) === JSON.stringify(['ingredients'])) {
        console.log('ingredients updated');
        updateIngredients(data as IIngredient[]);
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

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
