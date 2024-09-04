import { GetStaticProps } from 'next';

import IngredientsPage from 'components/Ingredients';

interface IIngredientsProps {
  data: any;
}

const Ingredients = ({ data }: IIngredientsProps) => <IngredientsPage data={data} />

export default Ingredients;

export const getStaticProps: GetStaticProps<IIngredientsProps> = async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = {}; await res.json();

  return {
    props: {
      data,
    },
    revalidate: 60,
  };
};

