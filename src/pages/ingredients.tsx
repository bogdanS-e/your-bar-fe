import { GetStaticProps } from "next";
import Head from "next/head";
import styled from "styled-components";

interface IIngredientsProps {
  data: any;
}

export default function Ingredients({ data }: IIngredientsProps) {

  return (
    <>
      <Head>
        <title>Ingredients</title>
        <meta name="description" content="Ingredients" />

      </Head>
      <main>
        <Title>
        </Title>
        some thegfsddfgdsfdedfdes
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<IIngredientsProps> = async () => {
  //const res = await fetch('https://dummyjson.com/products');
  const data = {} ;//|| await res.json();

  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}

const Title = styled.h1`
  color: red;
`;
